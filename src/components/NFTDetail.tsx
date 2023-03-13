import { DEFAULT_ERROR_IMAGE } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Image from "next/image";
import styles from "../styles/NFTDetail.module.css";

type FunctionProps = {
    selectedNft: any;
    setSelectedNft: Dispatch<SetStateAction<any>>;
}

export default function NFTDetail({ selectedNft, setSelectedNft }: FunctionProps) {
    const [imageError, setImageError] = useState<boolean>(false);

    return (
        <Modal show={selectedNft} contentClassName={styles.nftDetailModal} onHide={() => setSelectedNft(undefined)} scrollable centered>
            <ModalHeader>
                <Modal.Title className={styles.modalTitle}>{selectedNft.name}</Modal.Title>
            </ModalHeader>
            <ModalBody className={styles.modalBody}>
                <div>
                    {
                        imageError ?
                            <Image width={200} height={200} alt={"Invalid Image Metadata"} src={DEFAULT_ERROR_IMAGE} priority />
                            :
                            selectedNft.image.endsWith(".mp4") ?
                                <video
                                    src={selectedNft.image}
                                    onLoadedData={(result) => {
                                        const target = result.target as HTMLVideoElement
                                        if (target.duration === 0) {
                                            setImageError(true)
                                        }
                                    }}
                                    autoPlay
                                    loop
                                />
                                :
                                //Both onError and onLoadingComplete are used because there are multiple reported instances of onError not being called everytime
                                <Image
                                    width={200}
                                    height={200}
                                    alt={selectedNft.name}
                                    src={selectedNft.image}
                                    onError={() => {
                                        setImageError(true)
                                    }}
                                    onLoadingComplete={(result) => {
                                        if (result.width === 0) {
                                            setImageError(true)
                                        }
                                    }}
                                    loading="eager"
                                    priority
                                />
                    }
                </div>
                <div className={styles.nftInfo}>
                    <p><b>{selectedNft.description} </b></p>
                    <p>
                        <b>TokenID</b>
                        <br />
                        #{selectedNft.tokenId}
                    </p>
                    <p>
                        <b>Contract</b>
                        <br />
                        <a href={selectedNft.contractUrl} target="_blank" rel="noopener noreferrer">{selectedNft.contract}</a>
                    </p>
                    <p>
                        <b>Owner</b>
                        <br />
                        <a href={selectedNft.ownerUrl} target="_blank" rel="noopener noreferrer">{selectedNft.owner}</a>
                    </p>
                </div>
            </ModalBody>
            <ModalFooter className={styles.modalFooter}>
                <Button onClick={() => window.open(selectedNft.openseaUrl)}>View on opensea</Button>
            </ModalFooter>
        </Modal>
    );
};
