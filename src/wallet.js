import React from 'react';
import { configureChains, createConfig, WagmiConfig, useAccount, useConnect, useDisconnect } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { sepolia } from 'wagmi/chains';
import dotenv from 'dotenv';

dotenv.config();

const { chains, provider } = configureChains(
    [sepolia],
    [alchemyProvider({ apiKey: process.env.VITE_ALCHEMY_API_KEY }), publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
});

export const WalletProvider = ({ children }) => (
    <WagmiConfig config={config}>{children}</WagmiConfig>
);

export const Wallet = () => {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({ connector: new InjectedConnector({ chains }) });
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

export const CreateNFT = ({ cid }) => {
    const createNFT = async () => {
        console.log('Creating NFT with CID:', cid);
    };

    return <button onClick={createNFT}>Create NFT</button>;
};
