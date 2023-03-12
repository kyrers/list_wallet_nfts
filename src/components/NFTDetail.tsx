import { DEFAULT_ERROR_IMAGE } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import styles from "../styles/NFTDetail.module.css";

type FunctionProps = {
    selectedNft: any;
    setSelectedNft: Dispatch<SetStateAction<any>>;
}

export default function NFTDetail({ selectedNft, setSelectedNft }: FunctionProps) {
    return (
        <Modal show={selectedNft} contentClassName={styles.nftDetailModal} onHide={() => setSelectedNft(undefined)} scrollable centered>

            <ModalHeader>
                <Modal.Title className={styles.modalTitle}>{selectedNft.name}</Modal.Title>
            </ModalHeader>
            <ModalBody className={styles.modalBody}>
                <div>
                    {
                        selectedNft.image.endsWith(".mp4") ?
                            <video src={selectedNft.image} />
                            :
                            <img alt={selectedNft.name} src={selectedNft.image} onError={(e) => e.currentTarget.src = DEFAULT_ERROR_IMAGE} />
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

}