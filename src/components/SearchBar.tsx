import { searchBarPlaceholderText } from "@/utils/strings";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import styles from "../styles/SearchBar.module.css"

export default function SearchBar({ setAddress }: { setAddress: Dispatch<SetStateAction<string>> }) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        /*const input = e.target[0].value;
        console.log("HERE", input);
        const isValid = ethers.isAddress(input);
        console.log("IS VALID", isValid);
        if (isValid) {
            ethers.providers.
            const provider = new ethers.AlchemyProvider("mainnet", process.env.NEXT_ALCHEMY_MAINNET_API_KEY);
            console.log(provider);
            const ensName = await provider.lookupAddress(input);
            console.log("ENS", ensName)
        }*/
        /*
        if (!isTargetNetwork) {

            setIsToExecuteAfterNetworkChange(true);
            switchNetwork?.(targetNetwork.chainId);
        } else {
            displayAlert(loadingElement("Subscribing"));
            write?.();
        }*/
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input type="text" placeholder={searchBarPlaceholderText} />
        </form>
    );
}
