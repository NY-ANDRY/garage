<script setup lang="ts">
import { ref } from "vue";
import { IonModal, IonContent } from '@ionic/vue';
import { Voiture } from "@/types/types";
import TextInput from "@/components/input/TextInput.vue";
import { DatePicker } from "primevue";
import ColorPicker from 'primevue/colorpicker';
import Button from "@/components/buttons/Button.vue";
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import { useAuthStore} from '@/stores/auth';


const { user } = useAuthStore();

const open = ref(false);
const { mutate, loading, error } = useFirestoreMutation("voitures");

const numero = ref('');
const nom = ref('');
const description = ref('');
const url_img = ref('');
const couleurHex = ref('');
const marque = ref('');
const annee = ref('');
const date = ref();

const closeModal = () => {
  open.value = false;
  console.log("dismisssss");

};

const handleSubmit = async () => {
  const newCar: Partial<Voiture> = {
    numero: numero.value,
    nom: nom.value,
    description: description.value,
    url_img: url_img.value,
    couleurHex: couleurHex.value,
    marque: marque.value,
    annee: annee.value,
    user: {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL
    }
  };
  try {
    const docId = `${Date.now()}`;
    await mutate(newCar, { type: "set" });
    console.log("Voiture ajoutée avec succès :", newCar);
    closeModal();
  } catch (err) {
    console.error("Erreur lors de l'ajout de la voiture :", err);
  }
};
</script>

<template>
  <div @click="open = true"
    class="flex items-center justify-center w-full h-20 min-h-20 border-dashed rounded-xl border-2 border-neutral-100 text-neutral-400 mb-4">
    Créer une nouvelle voiture
  </div>

  <ion-modal :is-open="open" initial-breakpoint="0.98" :breakpoints="[0, 0.98, 0.98]" @didDismiss="closeModal"
    class="custom-modalll">
    <ion-content class="p-0 overflow-hidden">
      <div class="bg-white rounded-t-3xl p-6 space-y-4">
        <h2 class="text-xl font-semibold mb-4">Créer une voiture</h2>
        <DatePicker v-model="date" />
        <TextInput label="Numero" v-model="numero" placeholder="Ex: 123-ABC" />
        <TextInput label="Nom" v-model="nom" placeholder="Ex: Tesla Model 3" />
        <TextInput label="Description" v-model="description" placeholder="Ex: Voiture électrique" />
        <TextInput label="Marque" v-model="marque" placeholder="Ex: Tesla" />
        <TextInput label="Année" v-model="annee" placeholder="Ex: 2023" />

        <div class="flex flex-col">
          <div class="flex justify-between">

            <div class="flex flex-col mb-1 text-sm font-medium text-gray-700 gap-1">
              <div class="flex">Couleur</div>
              <div class="flex">
                <ColorPicker class="w-full rounded-full" disabled v-model="couleurHex" />
              </div>
            </div>

            <ColorPicker v-model="couleurHex" inline />

          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <Button @click="handleSubmit">
            Créer
          </Button>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>


<style>
.p-colorpicker-preview {
  border-radius: 4px;
  width: 48px !important;
  height: 48px !important;
}
</style>