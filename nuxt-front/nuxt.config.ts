import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@nuxtjs/tailwindcss", "@intlify/nuxt3"],
  modules: ["@nuxtjs/sitemap"],
  intlify: {
    localeDir: "locales",
    locale: "en",
  },
});
