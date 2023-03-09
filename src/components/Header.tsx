import styles from "../styles/Header.module.css"
import { appTitle } from "@/utils/strings";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerText}>{appTitle}</h1>
        </header>
    );
};
