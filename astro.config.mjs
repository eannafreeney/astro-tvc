import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "server",
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  adapter: netlify({ imageCDN: false }),
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    svelte(),
    alpinejs(),
  ],
});
