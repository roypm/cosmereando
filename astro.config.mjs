import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://roypm.github.io",
  base: "/cosmereando",
  integrations: [sitemap()],
});
