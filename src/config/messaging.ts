import { toastController } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

import { messaging } from '../config/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import { Preferences } from '@capacitor/preferences';

const vapidKey = 'BN7vt5bx8oorE3xnziC4SHqsqvkntWY5a9fW2Jl7oZpXjckg70QqsjjSpUdSB01_8XF9tFCt94tQt1cDRpCSTt8';

const saveToken = async (tokenValue: any) => {
    await Preferences.set({
        key: 'fcm_token',
        value: tokenValue
    });
};

async function initializePush() {
    const isPushSupported = 'Notification' in window || Capacitor.isNativePlatform();
    if (!isPushSupported) return;

    if (Capacitor.isNativePlatform()) {
        let perm = await PushNotifications.checkPermissions();

        if (perm.receive !== 'granted') {
            perm = await PushNotifications.requestPermissions();
        }

        if (perm.receive === 'granted') {
            await PushNotifications.register();

            await PushNotifications.addListener('registration', async (token) => {
                await saveToken(token.value);
            });

            await PushNotifications.addListener('registrationError', (err) => {
                console.error('Erreur d\'enregistrement APK:', err);
            });

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
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const currentToken = await getToken(messaging, {
                    vapidKey: vapidKey
                });
                if (currentToken) {
                    await saveToken(currentToken);
                }
            }
        } catch (error) {
            console.error('Erreur Web Push:', error);
        }

        onMessage(messaging, async (payload) => {
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

export { initializePush };