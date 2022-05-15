export default {
  ssr: false,
  head: {
    title: 'netatmo-weathermap-widget',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: ['~plugins/locator.ts'],
  components: {
    dirs: [
      // Enable component auto naming and auto import
      '~/components',
    ],
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {},
  auth: {},
}
