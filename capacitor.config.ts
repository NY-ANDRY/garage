import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nyandry.garage',
  appName: 'garage',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    plashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#C1F11D",
      androidScaleType: "CENTER_CROP",
      showSpinner: false
    }
  },
};

export default config;
