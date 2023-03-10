import { getNftImageUrl, getNftName } from "@/utils/common";
import { DEFAULT_ERROR_IMAGE } from "@/utils/constants";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import Moralis from "moralis/.";
import { useEffect, useState } from "react";
import styles from "../styles/MainPanel.module.css";
import LoadingScreen from "./LoadingScreen";
import SearchBar from "./SearchBar";

export default function MainPanel() {
    const [address, setAddress] = useState<string>("");
    //const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayData, setDisplayData] = useState<any[]>([]);

    const { data: nftData, isFetching } = useEvmWalletNFTs({ address: address });

   /* useEffect(() => {
        setIsLoading(true)
    }, [address])*/

    useEffect(() => {
        console.log(nftData)
        if (nftData && nftData?.length > 0) {
            setDisplayData(nftData.map((nft: any) => ({
                name: getNftName(nft),
                image: getNftImageUrl(nft),
                tokenId: nft.tokenId
            })));
        }
    }, [nftData])
    console.log(displayData);

    const renderCards = () => {

        return (
            displayData?.map(nft =>
                <div key={`${nft.name}-#${nft.tokenId}`} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={nft.image} onError={(e) => e.currentTarget.src = DEFAULT_ERROR_IMAGE} />
                    </div>

                    <div className={styles.cardBody}>
                        <h2 title={nft.name}>{nft.name}</h2>
                        <span title={`#${nft.tokenId}`}>#{nft.tokenId}</span>
                    </div>
                </div>
            )
        );
    }

    return (
        <div className={styles.mainPanel}>
            <SearchBar setAddress={setAddress}/>
            <div className={styles.grid}>
                {
                    isFetching ?
                        <LoadingScreen />
                        :
                        renderCards()
                }
            </div>
        </div>
    );
}
