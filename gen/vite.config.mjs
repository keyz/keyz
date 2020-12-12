import { defineConfig } from "vite";

export default defineConfig({
  define: {
    // https://github.com/autoprefixer/autoprefixer.github.io/blob/a0285dd6ae35152733f6fda82bbda7b52664fc5c/vite.config.js#L5
    "process.env": {}, // For PostCSS and Autoprefixer
  },
});
