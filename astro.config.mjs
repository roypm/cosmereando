import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cosmereando.roypm.es",
  integrations: [sitemap()],
});
