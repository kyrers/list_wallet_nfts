export const getNftName = (nft: any) => {
    return nft.metadata?.name ? nft.metadata?.name : nft.name;
};

export const getNftImageUrl = (nft: any) => {
    let url = nft.metadata?.image ?? "";

    //If it is an ipfs stored image, we modify the link to use moralis to get the image
    if (url.startsWith("ipfs")) {
        url = "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)[0];
    }

    //Some NFTs return links with extra query parameters after the .png which typically result in unauthorized errors. Remove those.
    if (url.includes(".png?")) {
        url = url.split(".png?")[0] + ".png";
    }

    return url;
};
