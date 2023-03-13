import { getAddressUrl, getNftImageUrl, getNftName, getOpenseaUrl } from "@/utils/common";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { useEffect, useState } from "react";

type NftInfo = {
    name: string,
    image: string,
    tokenId: string,
    ownerUrl: string,
    owner: string,
    contractUrl: string,
    contract: string
    description: string
}

export default function useNftInfo(address: any) {
    const [hasNoData, setHasNoData] = useState<boolean>(false);
    const [isDecoding, setIsDecoding] = useState<boolean>(false);
    const [nftData, setNftData] = useState<NftInfo[]>();
    const { data, isFetching, error: isError } = useEvmWalletNFTs({ address: address });

    useEffect(() => {
        setIsDecoding(true);
        setNftData([]);

        if (!isFetching) {
            if (data) {
                if (data?.length > 0) {
                    setNftData(
                        data.map(
                            (nft: any) => ({
                                name: getNftName(nft),
                                image: getNftImageUrl(nft),
                                tokenId: nft.tokenId,
                                ownerUrl: `${getAddressUrl()}${nft.ownerOf.checksum}`,
                                owner: nft.ownerOf.checksum,
                                contractUrl: `${getAddressUrl()}${nft.tokenAddress.checksum}`,
                                contract: nft.tokenAddress.checksum,
                                openseaUrl: `${getOpenseaUrl()}${nft.tokenAddress.checksum}/${nft.tokenId}`,
                                description: nft.metadata?.description ?? ""
                            })
                        )
                    );

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
