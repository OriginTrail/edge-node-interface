/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_SERVICE_ENDPOINT: string;
  readonly VITE_DKG_ENVIRONMENT: "PRODUCTION" | "TEST";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
