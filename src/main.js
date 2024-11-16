import('@/assets/scss/input.scss');

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { Ripple } from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import { createHead } from '@unhead/vue'
import GoogleSignInPlugin from 'vue3-google-signin'

const vuetify = createVuetify({
    directives: {
        Ripple
    },
    ssr: true
})

const app = createApp(App)
const head = createHead()

app.config.globalProperties.emitter = mitt()

app.use(vuetify)
app.use(createPinia())
app.use(head)
app.use(router)
app.use(VueCookies)
app.use(GoogleSignInPlugin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})
app.mount('#app')
