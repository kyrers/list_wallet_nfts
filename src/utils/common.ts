import { DEFAULT_ERROR_IMAGE } from "./constants";

export const getNftName = (nft: any) => {
    return nft.title && nft.title !== "" ? nft.title : nft.contract?.name ?? "";
};

export const getImageUrl = (nft: any) => {
    const url: string = nft.media[0]?.gateway;
    if (url) {
        return "https:" + url.split(":").slice(1);
    }
    return DEFAULT_ERROR_IMAGE;
}

export const getAddressUrl = () => {
    return process.env.NEXT_PUBLIC_ETHERSCAN_ADDRESS_URL;
};

export const getOpenseaUrl = () => {
    return process.env.NEXT_PUBLIC_OPENSEA_URL;
};
