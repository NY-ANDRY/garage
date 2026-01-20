import { ref, onMounted, provide, inject, Ref } from "vue";
import { auth } from "@/config/firebaseConfig";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

export interface AuthState {
  user: Ref<User | null>;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthSymbol = Symbol("Auth");

export function provideAuth(): AuthState {
  const user = ref<User | null>(null);

  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      console.log("Auth State Changed:", currentUser ? "Logged In" : "Logged Out");
    });
    return () => unsubscribe();
  });

  const login = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      user.value = result.user;
    } catch (error: any) {
      console.error("Erreur de connexion:", error.code);
      throw error;
    }
  };

  const register = async (email: string, pass: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      user.value = result.user;
    } catch (error: any) {
      console.error("Erreur d'inscription:", error.code);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  const authState: AuthState = { user, login, register, logout };
  provide(AuthSymbol, authState);
  return authState;
}

export function useAuth(): AuthState {
  const authState = inject<AuthState>(AuthSymbol);
  if (!authState) throw new Error("useAuth doit être utilisé après provideAuth !");
  return authState;
}