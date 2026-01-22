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
import { Preferences } from '@capacitor/preferences'
import { User } from '@/types/types'
import { useFirestoreMutation } from '@/composables/useFirestoreMutation'

const { mutate } = useFirestoreMutation("users")

const AUTH_KEY = 'is_logged_in'

const setLoginState = async (value: boolean) => {
  await Preferences.set({
    key: AUTH_KEY,
    value: value ? '1' : '0'
  })
}

export const getLoginState = async (): Promise<boolean> => {
  const { value } = await Preferences.get({ key: AUTH_KEY })
  return value === '1'
}

const setFcmToken = async (uc: UserCredential) => {
  const { value } = await Preferences.get({ key: 'fcm_token' })

  const u: User = {
    uid: uc.user.uid,
    email: uc.user.email,
    displayName: uc.user.displayName,
    photoURL: uc.user.phoneNumber,
    fcmToken: value
  }

  await mutate(u, { type: 'set', id: uc.user.uid })
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const initialized = ref(false)

  onAuthStateChanged(auth, async (currentUser) => {
    user.value = currentUser
    await setLoginState(!!currentUser)
    initialized.value = true
  })

  const login = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email, pass)
    user.value = result.user
    await setLoginState(true)
    await setFcmToken(result)
  }

  const register = async (email: string, pass: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass)
    user.value = result.user
    await setLoginState(true)
    await setFcmToken(result)
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
    await setLoginState(false)
  }

  return {
    user,
    initialized,
    login,
    register,
    logout
  }
})
