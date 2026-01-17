import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    extends: ["js/recommended", prettierConfig],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "no-console": "warn",
      eqeqeq: "warn",
      curly: "warn",
      "no-else-return": "warn",
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
])
