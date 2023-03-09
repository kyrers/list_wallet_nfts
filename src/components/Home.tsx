import styles from "../styles/Home.module.css";
import { useState } from "react";
import Header from "./Header";
import MainPanel from "./MainPanel";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <MainPanel />
            <Footer />
        </div>
    );
}