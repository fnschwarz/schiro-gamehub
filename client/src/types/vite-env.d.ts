/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_IMPRINT_NAME: string;
    readonly VITE_IMPRINT_STREET: string;
    readonly VITE_IMPRINT_CITY: string;
    readonly VITE_IMPRINT_COUNTRY: string;
    readonly VITE_IMPRINT_EMAIL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
