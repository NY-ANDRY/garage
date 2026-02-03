<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import InterventionBox from "@/components/box/InterventionBox.vue";
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Running_Cat.json';
import type { Intervention, Reparation, Voiture } from '@/types/types';
import CarSelect from '../car/CarSelect.vue';
import { useFirestoreMutation } from '@/composables/useFirestoreMutation';
import { Timestamp } from 'firebase/firestore';
import { useAuthStore } from '@/stores/auth';
import { motionFade } from '@/components/animations/motionBind';

const { user } = useAuthStore();




const { mutate, loading: loadingCreate, error: errorCreate } = useFirestoreMutation("reparations");




const { data, loading } = useFirestoreCollection<Intervention>("interventions");

const selectedIntervention = ref<Intervention[]>([]);
const car = ref<Voiture | null>(null);

const setCar = (c: Voiture) => {
  car.value = c;
}

const toggleIntervention = (item: Intervention) => {
  const index = selectedIntervention.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    selectedIntervention.value.splice(index, 1);
  } else {
    selectedIntervention.value.push(item);
  }
};

const isSelected = (id: string) => {
  return selectedIntervention.value.some(i => i.id === id);
}

const handleSubmit = async () => {
  if (!car.value || !user) return;

  const newReparation: Reparation = {
    voiture: car.value,
    user: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    },
    interventions: selectedIntervention.value,
    statut: 0,
    statut_histo: [],
    paiements: [],
    paiement_statut: 0,
    paiement_total: 0,
    total_a_payer: 0,
    date: Timestamp.now()
  };

  await mutate(newReparation, { type: 'set' });
};

const totalInterventions = computed(() => {
  return selectedIntervention.value.reduce(
    (sum, item) => sum + (item.prix || 0),
    0
  );
});

const totalDuree = computed(() => {
  return selectedIntervention.value.reduce(
    (sum, item) => sum + (item.duree || 0),
    0
  );
});

const formattedTotalDuree = computed(() => {
  const hours = Math.floor(totalDuree.value / 3600);
  const minutes = Math.floor((totalDuree.value % 3600) / 60);
  const seconds = totalDuree.value % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else if (minutes > 0) {
    return `${minutes}min ${seconds}s`;
  }
  return `${seconds}s`;
});


// Ajouter après les autres ref
const showSummary = ref(false);

// Ou pour l'ouvrir par défaut
// const showSummary = ref(true);


</script>

<template>
  <ion-page>
    <Header title="Nouvelle Réparation" />
    <ion-content :fullscreen="true" class="relative">
      <!-- Image d'arrière-plan -->
      <div class="absolute inset-0 z-0 opacity-10">
        <img src="/car.jpg" alt="Arrière-plan voiture" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"></div>
      </div>

      <div class="relative z-10">
        <LoadingWrapper :loading="loading" :animationData="catAnimation" :width="400" :height="400">
          <div class="max-w-4xl mx-auto px-4 py-6">
            <!-- En-tête avec petite image -->
            <div class="mb-8 flex items-center gap-6">
              <div class="flex-shrink-0">
                <img src="/car.jpg" alt="Icône voiture" class="w-20 h-20 rounded-2xl object-cover shadow-lg" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Nouvelle réparation</h1>
                <p class="text-gray-600">Sélectionnez votre véhicule et les interventions nécessaires</p>
              </div>
            </div>

            <!-- Sélection du véhicule -->
            <div class="mb-10">
              <div class="flex items-center gap-2 mb-4">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h2 class="text-lg font-semibold text-gray-800">Véhicule</h2>
              </div>
              <CarSelect @select="setCar" />
              <div v-if="car"
                class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800">{{ car.marque }} {{ car.modele }}</h3>
                      <p class="text-sm text-gray-600">{{ car.annee }} • {{ car.immatriculation }}</p>
                    </div>
                  </div>
                  <button @click="car = null"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Interventions disponibles -->
            <div class="mb-10">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-2">
                  <div class="p-2 bg-purple-100 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 class="text-lg font-semibold text-gray-800">Interventions disponibles</h2>
                </div>
                <span class="text-sm text-gray-500">
                  {{ selectedIntervention.length }}/{{ data.length }} sélectionnées
                </span>
              </div>

              <div v-bind="motionFade" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InterventionBox v-for="item in data" :key="item.id" :item="item" :isSelected="isSelected(item.id)"
                  @toggle="toggleIntervention" />
              </div>
            </div>








            <!-- Remplacer la section du résumé -->
            <!-- Résumé et validation -->
            <div class="mb-8">
              <!-- Bouton pour afficher/masquer le résumé -->
              <button @click="showSummary = !showSummary"
                class="w-full mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-gray-200 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900">Résumé de la réparation</h3>
                    <p class="text-sm text-gray-500">Cliquez pour voir les détails</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-700">
                    {{ $t('currency') }} {{ totalInterventions }}
                  </span>
                  <svg :class="{ 'transform rotate-180': showSummary }"
                    class="w-5 h-5 text-gray-500 transition-transform duration-200" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <!-- Contenu du résumé (visible seulement quand showSummary est true) -->
              <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform -translate-y-4"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 transform -translate-y-4">
                <div v-if="showSummary" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                  <!-- Détails résumé -->
                  <div class="space-y-6">
                    <!-- Véhicule -->
                    <div v-if="car" class="bg-blue-50 rounded-xl p-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                          <span class="font-medium text-gray-700">Véhicule sélectionné</span>
                        </div>
                        <span class="font-semibold text-gray-900">{{ car.marque }} {{ car.modele }}</span>
                      </div>
                    </div>

                    <!-- Interventions sélectionnées -->
                    <div>
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="font-medium text-gray-700">Interventions</h4>
                        <span class="text-sm text-gray-500">{{ selectedIntervention.length }} service(s)</span>
                      </div>

                      <div v-if="selectedIntervention.length > 0" class="space-y-3">
                        <div v-for="item in selectedIntervention" :key="item.id"
                          class="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200">
                            </div>
                            <span class="font-medium text-gray-800">{{ item.nom }}</span>
                          </div>
                          <div class="flex items-center gap-6">
                            <span class="text-sm text-gray-500">{{ formattedTotalDuree }}</span>
                            <span class="font-bold text-gray-900">{{ $t('currency') }} {{ item.prix }}</span>
                          </div>
                        </div>
                      </div>

                      <div v-else class="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                        <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-gray-400">Aucune intervention sélectionnée</p>
                        <p class="text-sm text-gray-300 mt-1">Sélectionnez au moins une intervention</p>
                      </div>
                    </div>

                    <!-- Totaux -->
                    <div class="border-t border-gray-100 pt-4 space-y-4">
                      <div class="flex justify-between text-gray-600">
                        <span>Sous-total</span>
                        <span>{{ $t('currency') }} {{ totalInterventions }}</span>
                      </div>

                      <div class="flex justify-between items-center text-gray-600">
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Durée totale estimée</span>
                        </div>
                        <span class="font-medium">{{ formattedTotalDuree }}</span>
                      </div>

                      <div class="border-t border-gray-200 pt-4">
                        <div class="flex justify-between items-center">
                          <div>
                            <p class="font-bold text-lg text-gray-900">Total à payer</p>
                            <p class="text-sm text-gray-500">TVA incluse</p>
                          </div>
                          <p
                            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {{ $t('currency') }} {{ totalInterventions }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Bouton de validation -->
                    <button @click="handleSubmit" :disabled="!car || selectedIntervention.length === 0 || loadingCreate"
                      class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-3">
                      <svg v-if="loadingCreate" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span v-else>
                        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Valider la réparation
                      </span>
                    </button>

                    <p v-if="errorCreate" class="text-red-500 text-sm text-center mt-3">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  </div>
                </div>
              </Transition>
            </div>















          </div>






        </LoadingWrapper>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Animation pour le bouton */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Animation pour les éléments sélectionnés */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Style pour la carte sticky */
.sticky {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
</style>