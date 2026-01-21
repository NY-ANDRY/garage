// stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/config/firebaseConfig'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    UserCredential
} from 'firebase/auth'
import { Preferences } from '@capacitor/preferences';
import { User } from '@/types/types';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';

const { mutate } = useFirestoreMutation("users");

const setFcmToken = async (uc: UserCredential) => {
    const { value } = await Preferences.get({ key: 'fcm_token' });
    const u: User = {
        uid: uc?.user.uid,
        email: uc?.user.email,
        displayName: uc?.user.displayName,
        photoURL: uc?.user.phoneNumber,
        fcmToken: value
    }

    await mutate(u, { type: 'set', id: uc?.user.uid })
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        console.log('Auth State Changed:', currentUser ? 'Logged In' : 'Logged Out')
    })

    const login = async (email: string, pass: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, pass)
            user.value = result.user
            await setFcmToken(result);
        } catch (error: any) {
            console.error('Erreur de connexion:', error.code)
            throw error
        }
    }

    const register = async (email: string, pass: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, pass)
            user.value = result.user
            await setFcmToken(result);
        } catch (error: any) {
            console.error('Erreur d\'inscription:', error.code)
            throw error
        }
    }

    const logout = async () => {
        await signOut(auth)
        user.value = null
    }

    return { user, login, register, logout }
})
