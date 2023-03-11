import { DEFAULT_ERROR_IMAGE } from "@/utils/constants";
import styles from "../styles/NFTCards.module.css";

export default function NFTCards({ displayData }: { displayData: any[] }) {
    const renderCards = () => {
        return (
            displayData?.map(nft =>
                <div key={`${nft.name}-#${nft.tokenId}`} className={styles.card}>
                    <div className={styles.cardHeader}>
                        {
                            nft.image.endsWith(".mp4") ?
                                <video src={nft.image} />
                                :
                                <img src={nft.image} onError={(e) => e.currentTarget.src = DEFAULT_ERROR_IMAGE} />
                        }
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
        <div className={styles.grid}>
            {renderCards()}
        </div>
    );

}