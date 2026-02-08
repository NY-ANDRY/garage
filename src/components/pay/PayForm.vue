<script setup lang="ts">
import LoadingWrapper from '@/components/animations/LoadingWrapper.vue';
import catAnimation from '@/assets/animations/Car_Animation2.json';
import { onMounted, ref } from 'vue';
import { useFirestoreDoc } from '@/composables/useFirestoreDoc';
import { Recuperation, Reparation, User } from '@/types/types';
import { computed } from 'vue';
import ReparationBox from '@/components/reparations/ReparationBox.vue';
import { useFirestoreMutation } from "@/composables/useFirestoreMutation";
import EmptyRecuperation from '../empty/EmptyRecuperation.vue';
import { useAuthStore } from '@/stores/auth';
import AlertIcon from '../icons/AlertIcon.vue';

const { waitForUser } = useAuthStore();
const trueUser = ref<User | null>(null);

onMounted(async () => {
    trueUser.value = await waitForUser();
});

const { mutate: mutateReparations, loading: loadingMutateReparations, error: errorMutateReparations } = useFirestoreMutation("reparations");
const { mutate: mutateRecuperation, loading: loadingMutateRecuperation, error: errorMutateRecuperation } = useFirestoreMutation("recuperations");

const recuperationId = ref<string | null>('1');

const { data: dataRecuperation, loading: loadingRecuperation } = useFirestoreDoc<Recuperation>('recuperations', recuperationId);

const reparationId = computed(() => dataRecuperation.value?.reparation?.id ?? null);

const { data: dataReparation, loading: loadingReparation } = useFirestoreDoc<Reparation>('reparations', reparationId);

const openPay2 = ref(false);
const openRecuperer2 = ref(false);

const handlePay = () => {
    if (trueUser && trueUser.value?.uid != dataReparation.value?.user.uid) {
        openPay2.value = true;
        return;
    }
    mutateReparations({ statut: 3 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
}
const handleRecuperer = () => {
    if (trueUser && trueUser.value?.uid != dataReparation.value?.user.uid) {
        openRecuperer2.value = true;
        return;
    }
    mutateReparations({ statut: 4 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
    mutateRecuperation({ reparation: { id: '' } }, { type: 'update', id: '1' });
}

const handleRecuperer2 = () => {
    mutateReparations({ statut: 4 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
    mutateRecuperation({ reparation: { id: '' } }, { type: 'update', id: '1' });
    openRecuperer2.value = false;
}

const handlePay2 = () => {
    mutateReparations({ statut: 3 }, { type: 'update', id: dataRecuperation.value?.reparation.id });
    openPay2.value = false;
}

</script>

<template>

    <LoadingWrapper :loading="loadingRecuperation" :animationData="catAnimation" :width="400" :height="400">
        <h2 class="font-inter-b text-neutral-800">Voiture a recuperer</h2>

        <div v-if="dataReparation"
            class="flex flex-col justify-center w-full h-full gap-4 px-4 py-6 rounded-2xl shadow">
            <div class="flex flex-col gap-2">
                <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">Proprietaire</h6>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">uid</div>
                    <div class="col-span-2">{{ dataReparation.user.uid }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">nom</div>
                    <div class="col-span-2">{{ dataReparation.user.displayName }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">email</div>
                    <div class="col-span-2">{{ dataReparation.user.email }}</div>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <h6 class="font-inter-l capitalize text-sm text-neutral-400 mt-3!">Reparation</h6>
                <ReparationBox :reparation="dataReparation" />
            </div>

            <UButton :loading="loadingMutateReparations || loadingMutateRecuperation" loading-icon="i-lucide-loader"
                block v-if="dataReparation && dataReparation.statut == 3" v-on:click="handleRecuperer"
                class="flex justify-center h-12">Recuperer</UButton>
            <UButton :loading="loadingMutateReparations || loadingMutateRecuperation" v-else v-on:click="handlePay"
                loading-icon="i-lucide-loader" block class="flex justify-center h-12">Payer
            </UButton>

            <UModal v-model:open="openPay2" class="bg-white">
                <template #content>
                    <div class="flex flex-col pb-8 pt-8 gap-4">
                        <AlertIcon />
                        <div class="flex justify-center text-lg">
                            Ce n'est pas votre voiture!!!
                        </div>
                        <div class="flex justify-center mt-4">
                            <div class="flex justify-center w-1/2 h-12">
                                <UButton :loading="loadingMutateReparations || loadingMutateRecuperation"
                                    v-on:click="handlePay2" loading-icon="i-lucide-loader" block
                                    class="flex justify-center h-10">Payer
                                </UButton>
                            </div>
                        </div>
                    </div>
                </template>
            </UModal>

            <UModal v-model:open="openRecuperer2" class="bg-white">
                <template #content>
                    <div class="flex flex-col pb-8 pt-8 gap-4">
                        <AlertIcon />
                        <div class="flex justify-center text-lg">
                            Ce n'est pas votre voiture!!!
                        </div>
                        <div class="flex justify-center mt-4">
                            <div class="flex justify-center w-1/2 h-12">
                                <UButton :loading="loadingMutateReparations || loadingMutateRecuperation"
                                    v-on:click="handleRecuperer2" loading-icon="i-lucide-loader" block
                                    class="flex justify-center h-10">le Voler
                                </UButton>
                            </div>
                        </div>
                    </div>
                </template>
            </UModal>
        </div>

        <div v-else class="flex-1 flex items-center justify-center h-full pb-24">
            <EmptyRecuperation />
        </div>

    </LoadingWrapper>
</template>
