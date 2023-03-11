import useNftInfo from "@/hooks/useNftInfo";
import { noNftsToDisplayText, searchBarInputErrorText } from "@/utils/strings";
import { useEffect, useState } from "react";
import styles from "../styles/MainPanel.module.css";
import LoadingScreen from "./LoadingScreen";
import NFTCards from "./NFTCards";
import SearchBar from "./SearchBar";

export default function MainPanel() {
    const [address, setAddress] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputError, setInputError] = useState<boolean>(false);

    const { nftData, hasNoData, isDecoding, isError: errorLoadingNfts } = useNftInfo(address);

    useEffect(() => {
        if (!isDecoding) {
            setIsLoading(false);
        }
    }, [isDecoding]);

    return (
        <div className={styles.mainPanel}>
            <SearchBar address={address} setAddress={setAddress} setInputError={setInputError} setIsLoading={setIsLoading} />
            {
                isLoading || isDecoding ?
                    <LoadingScreen />
                    :
                    inputError ?
                        <span className={styles.errorSpan}>{searchBarInputErrorText}</span>
                        :
                        hasNoData ?
                            <span className={styles.noNfts}>{noNftsToDisplayText}</span>
                            :
                            <NFTCards displayData={nftData!} />
            }
        </div>
    );
}
