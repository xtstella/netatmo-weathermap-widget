import auth from './config/auth'

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
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg-sprite',
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {},
  auth,
  svgSprite: {},
  // for the deployment, in order to use Config Vars in heroku
  publicRuntimeConfig: {
    DEV_NETATMO_CLIENT_ID: process.env.DEV_NETATMO_CLIENT_ID,
    DEV_NETATMO_CLIENT_SECRET: process.env.DEV_NETATMO_CLIENT_SECRET,
    DEV_NETATMO_USER_NAME: process.env.DEV_NETATMO_CLIENT_SECRET,
    DEV_NETATMO_PASSWORD: process.env.DEV_NETATMO_CLIENT_SECRET,
  },
}
