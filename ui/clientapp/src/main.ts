import './assets/main.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '/src/assets/css/custom.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'

// import translations
import de from './locales/de.json'
import en from './locales/en.json'

// configure i18n
const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages: { de, en },
  legacy: false
})

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faFloppyDisk, faXmark, faPencil, faTrashCan, faPlus, faCircleInfo)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueApexCharts)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
