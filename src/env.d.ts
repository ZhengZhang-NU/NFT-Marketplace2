interface ImportMetaEnv {
    readonly VITE_ALCHEMY_API_KEY: string;
    readonly VITE_PRIVATE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
