// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    // baseURL: process.env.NODE_ENV === 'production' ? '/PLANTAE-Taiwan/' : '/',
    // buildAssetsDir: '/static/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
      }
    ],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  googleFonts: {
    families: {
      Ubuntu: true,
      'Noto+Sans+TC': true,
      Caveat: true
    }
  }
})
