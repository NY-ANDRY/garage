import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { auth } from '@/config/firebaseConfig'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth'
import { Preferences } from '@capacitor/preferences'
import { User } from '@/types/types'
import { useFirestoreMutation } from '@/composables/useFirestoreMutation'

const { mutate } = useFirestoreMutation("users")
const AUTH_KEY = 'is_logged_in'
const USER_KEY = 'current_user'

const setLoginState = async (value: boolean) => {
  await Preferences.set({ key: AUTH_KEY, value: value ? '1' : '0' })
}

export const getLoginState = async (): Promise<boolean> => {
  const { value } = await Preferences.get({ key: AUTH_KEY })
  return value === '1'
}

const mapFirebaseUser = async (uc: FirebaseUser) => {
  const { value: fcmToken } = await Preferences.get({ key: 'fcm_token' })

  let displayName = uc.displayName
  if (!displayName || displayName === "") {
    displayName = uc.email?.split('@')[0] ?? 'naruto'
  }

  const u: User = {
    uid: uc.uid,
    email: uc.email,
    displayName,
    photoURL: uc.photoURL,
    fcmToken
  }

  await mutate(u, { type: 'set', id: uc.uid })
  await Preferences.set({ key: USER_KEY, value: JSON.stringify(u) })
  return u
}

export const getStoredUser = async (): Promise<User | null> => {
  const { value } = await Preferences.get({ key: USER_KEY })
  return value ? JSON.parse(value) : null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const initialized = ref(false)

  const init = async () => {
    const storedUser = await getStoredUser()
    if (storedUser) user.value = storedUser
    initialized.value = true
  }

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = await mapFirebaseUser(currentUser)
      await setLoginState(true)
    } else {
      user.value = null
      await Preferences.remove({ key: USER_KEY })
      await setLoginState(false)
    }
    initialized.value = true
  })

  const login = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email, pass)
    user.value = await mapFirebaseUser(result.user)
    await setLoginState(true)
  }

  const register = async (email: string, pass: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass)
    user.value = await mapFirebaseUser(result.user)
    await setLoginState(true)
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
    await Preferences.remove({ key: USER_KEY })
    await setLoginState(false)
  }

  const waitForUser = async (): Promise<User> => {
    if (user.value) return user.value

    return new Promise((resolve) => {
      const stop = watch(
        () => user.value,
        (val) => {
          if (val) {
            stop()
            resolve(val)
          }
        }
      )
    })
  }

  return {
    user,
    initialized,
    init,
    login,
    register,
    logout,
    waitForUser
  }
})
