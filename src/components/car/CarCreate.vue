<script setup lang="ts">
import { ref } from "vue";
import { IonModal, IonContent } from '@ionic/vue';
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import { useAuthStore } from '@/stores/auth';
import { Voiture } from "@/types/types";

const marques = ref([
  'Audi',
  'BMW',
  'Chevrolet',
  'Citroën',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Mazda',
  'Mercedes-Benz',
  'Nissan',
  'Peugeot',
  'Renault',
  'Subaru',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo'
])

const currentYear = new Date().getFullYear();

const annees = Array.from({ length: 50 }, (_, i) =>
  String(currentYear - i)
);
const toast = useToast()


const { user } = useAuthStore();

const open = ref(false);
const { mutate, loading, error } = useFirestoreMutation("voitures");

const numero = ref('');
const nom = ref('');
const description = ref('...');
const url_img = ref('');
const couleurHex = ref('#00c950');
const marque = ref('');
const annee = ref('');

const closeModal = () => {
  open.value = false;
};

const handleSubmit = async () => {

  const newCar: Partial<Voiture> = {
    numero: numero.value,
    nom: nom.value,
    description: description.value,
    url_img: url_img.value,
    couleurHex: couleurHex.value.slice(1),
    marque: marque.value,
    annee: annee.value,
    user: {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL
    }
  };

  console.log(newCar);

  try {
    await mutate(newCar, { type: "set" });
    closeModal();
    toast.add({
      title: 'Success',
      description: 'Voiture enregistrer.',
      color: 'success'
    })
  } catch (err) {

    toast.add({
      title: 'Error',
      description: 'veuillez selectionner une voiture',
      color: 'error',
      orientation: 'vertical'
    })  }
};

</script>

<template>
  <div @click="open = true"
    class="flex items-center rounded-xl justify-center w-full h-20 min-h-20 border-dashed border-2 border-neutral-200 text-neutral-600 mb-4 cursor-pointer hover:border-primary-500 hover:text-primary-500 transition-colors">
    Créer une nouvelle voiture
  </div>

  <ion-modal :is-open="open" initial-breakpoint="0.96" :breakpoints="[0, 0.30, 0.96]" @didDismiss="closeModal"
    class="custom-modalll">
    <ion-content class="p-0 overflow-hidden">
      <div class="bg-white rounded-t-3xl p-6 space-y-4 flex flex-col gap-1">
        <h2 class="text-xl font-semibold mb-4">Créer une voiture</h2>

        <div class="flex gap-2 mb-0">
          <UFormGroup label="Numero" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">numero</div>
            <UInput v-model="numero" placeholder="Ex: 123-ABC" class="w-full" />
          </UFormGroup>

          <UFormGroup label="Nom" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">nom</div>
            <UInput v-model="nom" placeholder="Ex: Tesla Model 3" class="w-full" />
          </UFormGroup>
        </div>

        <UFormGroup label="Description" class="w-full mb-2 flex flex-col gap-1">
          <div class="capitalize text-neutral-400 text font-inter-m">description</div>
          <UTextarea v-model="description" placeholder="..." class="w-full" />
        </UFormGroup>

        <div class="flex gap-2">
          <UFormGroup label="Marque" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">marque</div>
            <USelect v-model="marque" :items="marques" class="w-full py-3! rounded-lg! px-3!" />
          </UFormGroup>
          <UFormGroup label="Année" class="w-full mb-2 flex flex-col gap-1">
            <div class="capitalize text-neutral-400 text font-inter-m">année</div>
            <USelect v-model="annee" :items="annees" class="w-full py-3! rounded-lg! px-3!" />
          </UFormGroup>
        </div>

        <UFormGroup label="Couleur" class="w-full mb-2 flex flex-col gap-1">
          <div class="capitalize text-neutral-400 text font-inter-m">couleur</div>
          <div class="flex overflow-hidden rounded-2xl">
            <input type="color" v-model="couleurHex"
              class="w-full h-12 border-0! outline-0! overflow-hidden rounded-xl!" />
          </div>
        </UFormGroup>

        <div class="flex overflow-hidden rounded mt-2">
          <UButton :loading="loading" loading-icon="i-lucide-loader" block @click="handleSubmit" class="h-12 py-4!">
            Créer
          </UButton>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>


<style></style>