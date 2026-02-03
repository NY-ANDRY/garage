<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/layout/Header.vue';
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '../../assets/animations/Car.json';
import { useFirestoreCollection } from '@/composables/userFirestoreCollection';
import type { Reparation } from '@/types/types';

const { data, loading } = useFirestoreCollection<Reparation>("reparations");
</script>

<template>
  <ion-page>
    <Header title="Tabb 1" />
    <ion-content :fullscreen="true" class="bg-gray-50">
      <LoadingWrapper 
        :loading="loading" 
        :animationData="catAnimation" 
        :width="400" 
        :height="400"
      >
        <div class="container mx-auto px-4 py-6 max-w-2xl">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Mes Réparations</h1>
            <p class="text-gray-600">Suivez l'état de vos réparations automobiles</p>
          </div>

          <div v-if="data.length === 0 && !loading" class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-gray-500">Aucune réparation pour le moment</p>
          </div>

          <div v-else class="space-y-5">
            <div
              v-for="rep in data"
              :key="rep.id"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <!-- En-tête de la carte -->
              <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="p-3 bg-blue-100 rounded-xl">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-bold text-lg text-gray-800">
                        {{ rep.voiture.marque }} {{ rep.voiture.nom }}
                      </h3>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="text-sm text-gray-500">
                          {{ rep.date?.toDate().toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Badge statut -->
                  <div 
                    :class="{
                      'px-4 py-1.5 rounded-full text-sm font-medium': true,
                      'bg-green-100 text-green-800': rep.statut === 'Terminé',
                      'bg-blue-100 text-blue-800': rep.statut === 'En cours',
                      'bg-yellow-100 text-yellow-800': rep.statut === 'En attente',
                      'bg-red-100 text-red-800': rep.statut === 'Annulé'
                    }"
                  >
                    {{ rep.statut }}
                  </div>
                </div>
              </div>

              <!-- Liste des interventions -->
              <div class="px-6 py-5">
                <h4 class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Interventions</h4>
                <div class="space-y-3">
                  <div
                    v-for="(inter, index) in rep.interventions"
                    :key="inter.id"
                    class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    :class="{ 'border-t border-gray-200': index > 0 }"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="font-medium text-gray-700">{{ inter.nom }}</span>
                    </div>
                    <span class="font-semibold text-gray-900">{{ inter.prix }} €</span>
                  </div>
                </div>

                <!-- Séparateur -->
                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center">
                    <span class="px-4 bg-white text-sm text-gray-500">Total</span>
                  </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div>
                    <p class="font-semibold text-gray-700">Total à payer</p>
                    <p class="text-sm text-gray-500">TVA incluse</p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-blue-700">{{ rep.total_a_payer }} €</p>
                  </div>
                </div>
              </div>

              <!-- Pied de carte -->
              <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div class="flex items-center justify-between">
                  <button class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Voir le détail
                  </button>
                  <button class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg">
                    Payer maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistiques résumées -->
          <div v-if="data.length > 0" class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500">Réparations</p>
                  <p class="text-2xl font-bold text-gray-800">{{ data.length }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500">En cours</p>
                  <p class="text-2xl font-bold text-yellow-600">
                    {{ data.filter(r => r.statut === 'En cours').length }}
                  </p>
                </div>
                <div class="p-3 bg-yellow-50 rounded-lg">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500">Terminées</p>
                  <p class="text-2xl font-bold text-green-600">
                    {{ data.filter(r => r.statut === 'Terminé').length }}
                  </p>
                </div>
                <div class="p-3 bg-green-50 rounded-lg">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Animations supplémentaires */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Transition pour les cartes */
.shadow-lg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de survol sur les boutons */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}
</style>