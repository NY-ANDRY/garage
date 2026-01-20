// composables/useAuth.ts
import { ref, onMounted, provide, inject, Ref } from "vue";
import { isPlatform } from "@ionic/vue";
import { auth } from "@/config/firebaseConfig";
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { Browser } from "@capacitor/browser";
import { App } from "@capacitor/app";

export interface AuthState {
  user: Ref<User | null>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthSymbol = Symbol("Auth");

// Scheme + redirect URI pour mobile
const MOBILE_SCHEME = "nyandrygarage";
const MOBILE_REDIRECT_URI = `${MOBILE_SCHEME}://auth`;
const google_WEB_CLIENT_ID = "984512474289-7k2cp3i3gfe8328ebgkq48b0dbqu04g2.apps.googleusercontent.com";

export function provideAuth(): AuthState {
  const user = ref<User | null>(null);

  // 🔁 Écoute Firebase Auth
  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });
    return () => unsubscribe();
  });

  // 🔐 Login universel
  const login = async () => {
    try {
      // 🌍 WEB
      if (isPlatform("desktop") || isPlatform("mobileweb")) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        console.log("--- Connected Web ---");
        return;
      }

      // 📱 MOBILE
      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=` + `${google_WEB_CLIENT_ID}` +
        `&redirect_uri=` + MOBILE_REDIRECT_URI +
        `&response_type=id_token` +
        `&scope=profile%20email` +
        `&nonce=ionic`;

      // Ouvrir le navigateur
      await Browser.open({ url: authUrl });

      // Écouter le retour via deep link
      await new Promise<void>((resolve, reject) => {
        App.addListener("appUrlOpen", async (data) => {
          try {
            const url = new URL(data.url);
            const idToken = url.hash
              .replace("#", "")
              .split("&")
              .find((p) => p.startsWith("id_token="))
              ?.split("=")[1];

            if (!idToken) throw new Error("ID Token manquant");

            const credential = GoogleAuthProvider.credential(idToken);
            const result = await signInWithCredential(auth, credential);

            user.value = result.user;
            console.log("--- Connected Mobile ---");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    user.value = null;
    console.log("--- Logged out ---");
  };

  const authState: AuthState = { user, login, logout };
  provide(AuthSymbol, authState);
  return authState;
}

export function useAuth(): AuthState {
  const authState = inject<AuthState>(AuthSymbol);
  if (!authState) throw new Error("useAuth doit être utilisé après provideAuth !");
  return authState;
}
