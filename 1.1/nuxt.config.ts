// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Plantae-Taiwan/' : '/',
    buildAssetsDir: '/static/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
      }
    ],
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module'
  ],
  typescript: {
    typeCheck: true
  }
  // @ts-ignore
  // loading: '~/components/CustomLoading.vue'
})
