export const getStatutName = (statut: number) => {
    switch (statut) {
        case 0:
            return 'en attente'

        case 1:
            return 'en cours'

        case 2:
            return 'terminer'

        case 2:
            return 'payer'

        default:
            return 'recuperer'
    }
}