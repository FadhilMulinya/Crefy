import { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { Provider } from '@reown/appkit/react'

const useContract = (contractAddress: string, contractABI: any) => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

    useEffect(() => {
        if (!window.ethereum) {
            console.error("MetaMask is required");
            return;
        }

        const init = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const signer = provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

                setProvider(provider);
                setSigner(signer);
                setContract(contractInstance);
            } catch (error) {
                console.error("Error connecting to contract:", error);
            }
        };

        init();
    }, [contractAddress, contractABI]);

    // Function to send transactions
    const sendTransaction = async (methodName: string, ...args: any[]) => {
        if (!contract) return;
        try {
            const tx = await contract[methodName](...args);
            await tx.wait();
            console.log("Transaction successful:", tx);
            return tx;
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return { contract, provider, signer, sendTransaction };
};

export default useContract;
