import { getAddressUrl, getImageUrl, getNftName, getOpenseaUrl } from "@/utils/common";
import { useState } from "react";
import useSWR from "swr";

type NftInfo = {
    name: string,
    image: string,
    mediaType: string,
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

    const fetcher = (...args: [any]) => {
        if (address && "" !== address) {
            setIsDecoding(true)
            return fetch(...args)
                .then((res) => res.json())
                .then((data) => decodeData(data));
        }

        return undefined;
    }

    const { error, isLoading } = useSWR(`api/alchemy?address=${address}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });


    const decodeData = (data: any) => {
        try {
            if (data) {
                if (data?.length > 0) {
                    setNftData(
                        data.map(
                            (nft: any) => {
                                return ({
                                    name: getNftName(nft),
                                    image: getImageUrl(nft),
                                    mediaType: nft.media[0]?.format ?? "png",
                                    tokenId: nft.tokenId,
                                    ownerUrl: `${getAddressUrl()}${address}`,
                                    owner: address,
                                    contractUrl: `${getAddressUrl()}${nft.contract.address}`,
                                    contract: nft.contract?.name ?? nft.contract.address,
                                    openseaUrl: `${getOpenseaUrl()}${nft.contract.address}/${nft.tokenId}`,
                                    description: nft.description ?? ""
                                })
                            }
                        )
                    );

                    setHasNoData(false);
                } else {
                    setHasNoData(true);
                }
            }

            setIsDecoding(false);
        } catch (_) {
            setIsDecoding(false);
        }
    }

    return {
        nftData,
        hasNoData,
        isDecoding: isLoading || isDecoding,
        isError: error
    };
};
