import getRoutes from './src/utils/getRoutes'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  srcDir: 'src',
  loading: false,
  ssr: process.env.NODE_ENV === 'production',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-store-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },

  env: {
    STRIPE_PK: process.env.STRIPE_PK
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vuex-shared-mutations.client.js',
    '~plugins/vuex-persisted-state.client.js',
    '~/plugins/vue-stripe.client.js',
    '~/plugins/directusApi.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    'nuxt-i18n'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  tailwindcss: {
    jit: true,
    config: {
      content: [
        './src/components/**/*.{vue,js}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Hind Madurai', 'sans-serif'],
            subheadings: ['Lora', 'sans-serif'],
            headings: ['Montserrat', 'sans-serif']
          },
          colors: {
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            tertiary: 'var(--tertiary)',
            quaternary: 'var(--quaternary)'
          }
        }
      }
    }
  },

  i18n: {
    defaultLocale: 'en',
    seo: true,
    baseUrl: 'process.env.NUXT_ENV_BASE_URL',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_seduerey',
      onlyOnRoot: true // recommended
    },
    vueI18nLoader: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        lang_id: 1
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es-ES.js',
        lang_id: 2
      }
    ],
    lazy: false,
    langDir: 'lang/'
  },

  publicRuntimeConfig: {
    isFullStatic: process.env.NUXT_ENV_FULL_STATIC,
    backendUrl: process.env.DIRECTUS_BACKEND_URL
  },

  sitemap: {
    hostname: process.env.NUXT_ENV_BASE_URL,
    gzip: true,
    routes () {
      return getRoutes({
        isStatic: process.env.NUXT_ENV_FULL_STATIC,
        locales: ['', 'es'],
        collections: [
          { name: 'posts', url: '/' },
          { name: 'manufacture', url: 'products' },
          { name: 'events', url: 'events' }
        ]
      })
    }
  },

  generate: { fallback: '404.html' }

}
