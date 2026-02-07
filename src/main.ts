import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';
import { initializePush } from './config/messaging';
import { i18n } from './locales/i18n';
import { createPinia } from 'pinia';
import ui from '@nuxt/ui/vue-plugin'

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './theme/tailwind.css';
import './theme/variables.css';
import './theme/style.css';
import './theme/font.css';

const pinia = createPinia()
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n)
  .use(ui)
  .use(pinia);

router.isReady().then(() => {
  app.mount('#app');
  initializePush();
});
