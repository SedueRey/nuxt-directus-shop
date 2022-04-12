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
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-i18n',
    '@nuxtjs/sitemap'
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

  analyze: {
    analyzerMode: 'static'
  },
  generate: { fallback: '404.html' },

  sitemap: {
    hostname: process.env.NUXT_ENV_BASE_URL,
    gzip: true,
    routes () {
      // eslint-disable-next-line no-undef
      // return getRoutes()
    }
  }
}
