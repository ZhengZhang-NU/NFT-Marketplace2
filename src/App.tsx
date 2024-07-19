import React, { useState } from 'react';
import { WalletProvider, Wallet, CreateNFT } from './wallet';
import { uploadToIPFS } from './ipfsClient';

const App: React.FC = () => {
    const [cid, setCid] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const cid = await uploadToIPFS(file);
            setCid(cid);
            console.log('File uploaded to IPFS with CID:', cid);
        }
    };

    return (
        <WalletProvider>
            <div>
                <h1>Decentralized NFT Marketplace</h1>
                <Wallet />
                <input type="file" onChange={handleUpload} />
                {cid && (
                    <div>
                        <p>File CID: {cid}</p>
                        <p>IPFS URL: <a href={`https://ipfs.infura.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">{`https://ipfs.infura.io/ipfs/${cid}`}</a></p>
                        <CreateNFT cid={`https://ipfs.infura.io/ipfs/${cid}`} />
                    </div>
                )}
            </div>
        </WalletProvider>
    );
};

export default App;
