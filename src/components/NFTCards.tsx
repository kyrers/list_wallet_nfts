import { DEFAULT_ERROR_IMAGE, PLACEHOLDER_IMAGE } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import styles from "../styles/NFTCards.module.css";

type NFTCardsProps = {
    displayData: any[];
    setSelectedNft: Dispatch<SetStateAction<any>>;
};

type CardProps = {
    nft: any;
    setSelectedNft: Dispatch<SetStateAction<any>>;
};

export default function NFTCards({ displayData, setSelectedNft }: NFTCardsProps) {
    return (
        <div className={styles.grid}>
            {
                displayData?.map((nft, index) =>
                    <NFTCard key={`${index}-${nft.name}-#${nft.tokenId}`} nft={nft} setSelectedNft={setSelectedNft} />
                )
            }
        </div>
    );
};

function NFTCard({ nft, setSelectedNft }: CardProps) {
    const [imageError, setImageError] = useState<boolean>(false);

    return (
        <div className={styles.card} onClick={() => setSelectedNft(nft)}>
            <div className={styles.cardHeader}>
                {
                    imageError ?
                        <Image width={200} height={200} alt={"Invalid Image Metadata"} src={DEFAULT_ERROR_IMAGE} priority />
                        :
                        nft.mediaType === "mp4" ?
                            <video
                                key={nft.image}
                                src={nft.image}
                                poster={PLACEHOLDER_IMAGE}
                                onLoadedData={(result) => {
                                    let target = result.target as HTMLVideoElement
                                    if (target.duration === 0) {
                                        setImageError(true)
                                    }
                                }}
                                autoPlay
                                loop
                                muted
                            />
                            :
                            //Both onError and onLoadingComplete are used because there are multiple reported instances of onError not being called everytime
                            <Image
                                key={nft.image}
                                width={200}
                                height={200}
                                alt={nft.name}
                                src={nft.image}
                                placeholder="blur"
                                blurDataURL={PLACEHOLDER_IMAGE}
                                onError={() => {
                                    setImageError(true)
                                }}
                                onLoadingComplete={(result) => {
                                    if (result.width === 0) {
                                        setImageError(true)
                                    }
                                }}
                                loading="eager"
                                priority={true}
                            />
                }
            </div>

            <div className={styles.cardBody}>
                <h2 title={nft.name}>{nft.name}</h2>
                <span title={`#${nft.tokenId}`}>#{nft.tokenId}</span>
            </div>
        </div>
    );
};
