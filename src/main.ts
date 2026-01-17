import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue, toastController } from '@ionic/vue';

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
import '@ionic/vue/css/palettes/dark.system.css';
import './theme/tailwind.css';
import './theme/variables.css';


// --- LOGIQUE DES NOTIFICATIONS ---
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

import { messaging } from './config/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
async function initializePush() {
  const isPushSupported = 'Notification' in window || Capacitor.isNativePlatform();
  if (!isPushSupported) return;

  if (Capacitor.isNativePlatform()) {
    // --- LOGIQUE POUR L'APK (ANDROID) ---
    let perm = await PushNotifications.checkPermissions();
    
    if (perm.receive !== 'granted') {
      perm = await PushNotifications.requestPermissions();
    }

    if (perm.receive === 'granted') {
      await PushNotifications.register();

      // Succès de l'enregistrement (récupération du Token)
      await PushNotifications.addListener('registration', (token) => {
        console.log('APK FCM Token:', token.value);
        // C'est ce token qu'il faut envoyer à ton serveur
      });

      // Erreur d'enregistrement
      await PushNotifications.addListener('registrationError', (err) => {
        console.error('Erreur d\'enregistrement APK:', err);
      });

      // Réception quand l'app est ouverte (Foreground)
      await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
        const toast = await toastController.create({
          header: notification.title,
          message: notification.body,
          duration: 5000,
          position: 'top'
        });
        await toast.present();
      });
    }
  } else {
    // --- LOGIQUE POUR LE WEB (TON CODE ACTUEL) ---
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const currentToken = await getToken(messaging, { 
          vapidKey: 'BN7vt5bx8oorE3xnziC4SHqsqvkntWY5a9fW2Jl7oZpXjckg70QqsjjSpUdSB01_8XF9tFCt94tQt1cDRpCSTt8' 
        });
        console.log('Web FCM Token:', currentToken);
      }
    } catch (error) {
      console.error('Erreur Web Push:', error);
    }
    
    onMessage(messaging, async (payload) => {
      console.log("hehe");
      
      const toast = await toastController.create({
        header: payload.notification?.title,
        message: payload.notification?.body,
        duration: 5000,
        position: 'top'
      });
      await toast.present();
    });
  }
}


const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
  initializePush();
});
