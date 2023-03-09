import styles from "../styles/Footer.module.css"
import { Twitter, Github } from "react-bootstrap-icons";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <a href="https://github.com/kyrers/list_wallet_nfts" target="_blank" rel="noopener noreferrer">
                    <Github size={24} />
                </a>
                <a href="https://twitter.com/kyre_rs" target="_blank" rel="noopener noreferrer">
                    <Twitter size={24} />
                </a>
            </div>
        </footer>
    );
}
