import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nyandry.garage',
  appName: 'garage',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#C1F11D",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    }
  },
};

export default config;
