declare module './wallet' {
    import { ReactNode } from 'react';
    import { Chain } from 'wagmi/chains';

    export const WalletProvider: React.FC<{ children: ReactNode }>;
    export const Wallet: React.FC;
    export const CreateNFT: React.FC<{ cid: string }>;
}

declare module './ipfsClient' {
    export const uploadToIPFS: (file: File) => Promise<string>;
}
