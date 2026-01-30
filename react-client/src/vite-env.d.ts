///<reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_SERVER_BASE_URL: string
  // add more variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
