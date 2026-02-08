<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonModal, IonContent, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/vue'
import { useVoitureCreation } from '@/composables/useVoitureCreation'
import { useFirestoreCollection } from '@/composables/userFirestoreCollection'

const { data: marquesFire, loading: loadingMarques } = useFirestoreCollection('marques')
const marques = computed(() => !loadingMarques.value ? marquesFire.value.map(v => v.nom) : [])

const currentYear = new Date().getFullYear()
const annees = Array.from({ length: 50 }, (_, i) => String(currentYear - i))

const open = ref(false)

const numero = ref('')
const nom = ref('')
const description = ref('...')
const url_img = ref('')
const couleurHex = ref('#00c950')
const marque = ref('')
const annee = ref('')

const { createVoiture, loading } = useVoitureCreation()

const closeModal = () => { open.value = false }

const resetForm = () => {
  numero.value = ''
  nom.value = ''
  description.value = '...'
  url_img.value = ''
  couleurHex.value = '#00c950'
  marque.value = ''
  annee.value = ''
}

const handleSubmit = () => {
  createVoiture({
    numero: numero.value,
    nom: nom.value,
    description: description.value,
    url_img: url_img.value,
    couleurHex: couleurHex.value,
    marque: marque.value,
    annee: annee.value
  }, () => {
    closeModal()
    resetForm()
  })
}
</script>


<template>
  <div @click="open = true"
    class="flex items-center rounded-xl justify-center w-full h-20 min-h-20 border-dashed border-2 border-neutral-200 text-neutral-600 mb-4 cursor-pointer hover:border-primary-500 hover:text-primary-500 transition-colors">
    Créer une nouvelle voiture
  </div>

  <ion-modal :is-open="open" initial-breakpoint="0.96" :breakpoints="[0, 0.80, 0.96]" @didDismiss="closeModal"
    class="custom-modalll">
    <ion-content class="p-0 overflow-hidden">
      <div class="bg-white rounded-t-3xl p-6 space-y-4 flex flex-col gap-1">
        <h2 class="text-xl font-semibold mb-4">Créer une voiture</h2>

        <div class="flex gap-2 mb-0">
          <div label="Numero" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">numero</div>
            <ion-input v-model="numero" class="w-full  border border-neutral-300 rounded px-2 py-2"></ion-input>
          </div>

          <div label="Nom" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">nom</div>
            <ion-input v-model="nom" class="w-full  border border-neutral-300 rounded px-2 py-2"></ion-input>
          </div>
        </div>

        <div label="Description" class="w-full mb-2 flex flex-col gap-1">
          <div class="capitalize text-neutral-400 text font-inter-m">description</div>
          <ion-textarea v-model="description" placeholder="..." class="w-full  border border-neutral-300 rounded p-2"></ion-textarea>
        </div>

        <div class="flex gap-2">
          <div label="Marque" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">marque</div>
            <ion-select v-model="marque" interface="popover" placeholder="marque"
              class="w-full border border-neutral-300 rounded px-2">
              <ion-select-option v-for="m in marques" :key="m" :value="m">{{ m }}</ion-select-option>
            </ion-select>
          </div>

          <div label="Année" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">année</div>
            <ion-select v-model="annee" interface="popover" placeholder="année"
              class="w-full border border-neutral-300 rounded px-2">
              <ion-select-option v-for="a in annees" :key="a" :value="a">{{ a }}</ion-select-option>
            </ion-select>
          </div>
        </div>

        <div label="Couleur" class="w-full mb-2 flex flex-col gap-1">
          <div class="capitalize text-neutral-400 text font-inter-m">couleur</div>
          <div class="flex overflow-hidden rounded-2xl">
            <input type="color" v-model="couleurHex"
              class="w-full h-12 border-0! outline-0! overflow-hidden rounded-xl!" />
          </div>
        </div>

        <div class="flex overflow-hidden rounded mt-2">
          <UButton :loading="loading" loading-icon="i-lucide-loader" block @click="handleSubmit" class="h-12 py-4!">
            Créer
          </UButton>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>


<style>
ion-select::part(icon) {
  display: none;
}

ion-select {
  --highlight-color: transparent;
  --background-focused: transparent;
}
</style>
