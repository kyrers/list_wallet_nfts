
import { DEFAULT_ERROR_IMAGE } from "./constants";

export const getNftName = (nft: any) => {
    return nft.metadata?.name ? nft.metadata?.name : nft.name;
};

export const getNftImageUrl = (nft: any) => {
    let url = nft.metadata?.image_url ?? nft.metadata?.image ?? DEFAULT_ERROR_IMAGE;


    //If it is an ipfs stored image, we modify the link to use moralis to get the image
    if (url.startsWith("ipfs")) {
        url = "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)[0];
    }

    //Some NFTs return links with extra query parameters after the .png which typically result in unauthorized errors. Remove those.
    if (url.includes(".png?")) {
        url = url.split(".png?")[0] + ".png";
    }

    if (url.includes(".jpg?")) {
        url = url.split(".jpg?")[0] + ".jpg";

    }

    if (url.includes(".svg?")) {
        url = url.split(".svg?")[0] + ".svg";

    }

    return url;
};

export const getAddressUrl = () => {
    return process.env.NEXT_PUBLIC_ETHERSCAN_ADDRESS_URL;
};

export const getOpenseaUrl = () => {
    return process.env.NEXT_PUBLIC_OPENSEA_URL;
};
