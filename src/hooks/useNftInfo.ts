import { getNftImageUrl, getNftName } from "@/utils/common";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

type NftInfo = {
    contractName: string;
    contractAddress: string;
    contractABI: any;
    contractType: number; //-1 proxy, 0 undefined, 1 ERC20, 2 ERC721, 3 ERC1155
    contract: Contract | undefined;
    logsEmitted: any[];
    decodedEvents: any[];
}

export default function useNftInfo(address: any) {
    const [hasNoData, setHasNoData] = useState<boolean>(false);
    const [isDecoding, setIsDecoding] = useState<boolean>(false);
    const [nftData, setNftData] = useState<any[]>();
    const { data, isFetching, error: isError } = useEvmWalletNFTs({ address: address });

    useEffect(() => {
        setIsDecoding(true);
        setNftData([]);
        
        if (!isFetching) {
            if (data) {
                if (data?.length > 0) {
                    setNftData(data.map((nft: any) => ({
                        name: getNftName(nft),
                        image: getNftImageUrl(nft),
                        tokenId: nft.tokenId
                    }
                    )));

                    setHasNoData(false);
                } else {
                    setHasNoData(true);
                }
            }
        }
        setIsDecoding(false);
    }, [isFetching]);

    return {
        nftData,
        hasNoData,
        isDecoding: isFetching || isDecoding,
        isError
    };
};
