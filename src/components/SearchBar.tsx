import { searchBarInputErrorText, searchBarPlaceholderText } from "@/utils/strings";
import { ethers } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/SearchBar.module.css"

type FunctionProps = {
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setInputError: Dispatch<SetStateAction<boolean>>;
}

export default function SearchBar({ address, setAddress, setIsLoading, setInputError }: FunctionProps) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const input = e.target[0].value;
        
        //If is hex string and a valid address, use it
        if (ethers.isHexString(input) && ethers.isAddress(input)) {
            setInputError(false);
            if (address !== input) {
                setIsLoading(true); 
                setAddress(input);
            }
        } else if (input.toLowerCase().endsWith(".eth")) {
            //If it is an ENS name, resolve it
            const provider = new ethers.AlchemyProvider("mainnet", process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY);
            const address = await provider.resolveName(input);

            //If resolved correctly, use it.
            if (ethers.isAddress(address)) {
                setInputError(false);
                if (address !== input) {
                    setIsLoading(true)
                    setAddress(address)
                }
            } else {
                setInputError(true)
            }
        } else {
            //Else, invalid address
            setInputError(true)
        }

        setIsLoading(false);
    };

    return (
        <>
            <form className={styles.searchBar} onSubmit={handleSubmit}>
                <input type="text" placeholder={searchBarPlaceholderText} />
            </form>
        </>
    );
}
