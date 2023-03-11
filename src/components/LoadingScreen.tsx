import { Spinner } from "react-bootstrap";
import styles from "../styles/LoadingScreen.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <Spinner />
        </div>
    );
};
