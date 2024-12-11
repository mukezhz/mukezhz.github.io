import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import yeskunallumami from "@yeskunall/astro-umami";

export default defineConfig({
  site: "https://mukesh.name.np",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    yeskunallumami({
      id: "6e145cd2-36ed-425d-bb8e-f59e641a2671",
    }),
  ],
});
