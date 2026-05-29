import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kudare.co",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  devToolbar: { enabled: false },
});
