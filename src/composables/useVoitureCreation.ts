import { useFirestoreMutation } from '@/composables/useFirestoreMutation'
import { useAuthStore } from '@/stores/auth'
import type { Voiture } from '@/types/types'
import { useToast } from '@nuxt/ui/runtime/composables/useToast'

export function useVoitureCreation() {
  const { user } = useAuthStore()
  const toast = useToast()

  const { mutate, loading, error } = useFirestoreMutation('voitures')

  const createVoiture = async (
    data: {
      numero: string
      nom: string
      description: string
      url_img: string
      couleurHex: string
      marque: string
      annee: string
    },
    onSuccess?: () => void
  ) => {
    if (!user) return

    if (!data.numero || !data.nom || !data.marque || !data.annee) {
      toast.add({
        title: 'Error',
        description: 'Veuillez remplir tous les champs obligatoires',
        color: 'error'
      })
      return
    }

    const newCar: Partial<Voiture> = {
      ...data,
      couleurHex: data.couleurHex.replace('#', ''),
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    }

    try {
      await mutate(newCar, { type: 'set' })

      toast.add({
        title: 'Success',
        description: 'Voiture enregistrée.',
        color: 'success'
      })

      onSuccess?.()
    } catch (e) {
      toast.add({
        title: 'Error',
        description: 'Une erreur est survenue, réessayez plus tard',
        color: 'error'
      })
    }
  }

  return {
    createVoiture,
    loading,
    error
  }
}
