import { Timestamp } from 'firebase/firestore'
import { useFirestoreMutation } from '@/composables/useFirestoreMutation'
import { useAuthStore } from '@/stores/auth'
import type { Intervention, Reparation, Voiture } from '@/types/types'
import { useToast } from '@nuxt/ui/runtime/composables/useToast'

export function useReparationCreation() {
  const { user } = useAuthStore()
  const toast = useToast()
  const { mutate, loading, error } = useFirestoreMutation('reparations')

  const createReparation = async (
    car: Voiture | null,
    interventions: Intervention[],
    reset?: () => void
  ) => {
    if (!car) {
      toast.add({
        title: 'Error',
        description: 'Veuillez sélectionner une voiture',
        color: 'error'
      })
      return
    }

    if (!interventions || interventions.length === 0) {
      toast.add({
        title: 'Error',
        description: 'Veuillez sélectionner au moins une intervention',
        color: 'error'
      })
      return
    }

    if (!user) return

    const newReparation: Reparation = {
      voiture: car,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      interventions,
      statut: 0,
      statut_histo: [],
      paiements: [],
      paiement_statut: 0,
      paiement_total: 0,
      total_a_payer: 0,
      date: Timestamp.now()
    }

    try {
      await mutate(newReparation, { type: 'set' })

      toast.add({
        title: 'Success',
        description: 'Votre réparation est en attente.',
        color: 'success'
      })

      reset?.()
    } catch (e) {
      toast.add({
        title: 'Error',
        description: 'Réessayez plus tard',
        color: 'error'
      })
    }
  }

  return {
    createReparation,
    loading,
    error
  }
}
