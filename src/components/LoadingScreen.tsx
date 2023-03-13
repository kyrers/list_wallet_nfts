import { loadingText } from "@/utils/strings";
import { Spinner } from "react-bootstrap";
import styles from "../styles/LoadingScreen.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <Spinner />
            <p>{loadingText}</p>
        </div>
    );
};
