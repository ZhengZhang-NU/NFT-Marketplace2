
import React from 'react';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { sepolia } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import dotenv from 'dotenv';

dotenv.config();

const { chains, provider, webSocketProvider } = configureChains(
    [sepolia],
    [alchemyProvider({ apiKey: process.env.VITE_ALCHEMY_API_KEY }), publicProvider()]
);

const client = createClient({
    autoConnect: true,
    connectors: [
        new InjectedConnector({
            chains,
        }),
    ],
    provider,
    webSocketProvider,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => (
    <WagmiConfig client={client}>{children}</WagmiConfig>
);

export const Wallet = () => {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({ connector: new InjectedConnector({}) });
    const { disconnect } = useDisconnect();

    return (
        <div>
            {isConnected ? (
                <div>
                    <p>Connected as: {address}</p>
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
            ) : (
                <button onClick={() => connect()}>Connect Wallet</button>
            )}
        </div>
    );
};

export const CreateNFT = ({ cid }: { cid: string }) => {
    const createNFT = async () => {
        console.log('Creating NFT with CID:', cid);
        // Add logic to create NFT using the CID
    };

    return <button onClick={createNFT}>Create NFT</button>;
};
