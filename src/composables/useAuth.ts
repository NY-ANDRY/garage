// composables/useAuth.ts
import { ref, onMounted, provide, inject, Ref } from "vue";
import {
  auth,
  googleProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithPopup, // <-- ajouté
} from "../config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export interface AuthState {
  user: Ref<User | null>;
  login: () => Promise<void>;
  loginWithPopup: () => Promise<void>; // <-- ajouté
  logout: () => Promise<void>;
}

const AuthSymbol = Symbol("Auth");

export function provideAuth(): AuthState {
  const user = ref<User | null>(null);

  onMounted(async () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        console.log("--- connected ---");
        user.value = result.user;
      } else {
        console.log("--- not connected ---");
      }
    } catch (error) {
      console.error(error);
    }

    return () => unsubscribe();
  });

  const login = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  // Nouvelle fonction login avec popup
  const loginWithPopup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        user.value = result.user;
        console.log("--- connected with popup ---");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    console.log("--- logout begin ---");
    await signOut(auth);
    console.log("--- logout ok ---");
    user.value = null;
  };

  const authState: AuthState = { user, login, loginWithPopup, logout };
  provide(AuthSymbol, authState);
  return authState;
}

export function useAuth(): AuthState {
  const authState = inject<AuthState>(AuthSymbol);
  if (!authState) {
    throw new Error("useAuth doit être utilisé après provideAuth !");
  }
  return authState;
}
