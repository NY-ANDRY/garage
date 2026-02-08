export function useStatut() {
  const getStatutBadge = (statut: number) => {
    switch (statut) {
      case 0:
        return {
          label: 'En attente',
          color: 'ghost'
        }

      case 1:
        return {
          label: 'En cours',
          color: 'warning'
        }

      case 2:
        return {
          label: 'Terminé',
          color: 'neutral'
        }

      case 3:
        return {
          label: 'Payé',
          color: 'info'
        }

      default:
        return {
          label: 'Récupéré',
          color: 'success'
        }
    }
  }

  return { getStatutBadge }
}
