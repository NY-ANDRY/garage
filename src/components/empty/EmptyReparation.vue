<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
    router.replace('/tabs/add');
}

</script>

<template>
    <div v-on:click="handleClick"
        class="flex flex-col w-full gap-8 border-dashed border-2 border-neutral-200 rounded-xl py-4">
        <div class="flex w-full justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-brush-cleaning-icon lucide-brush-cleaning">
                <path d="m16 22-1-4" />
                <path
                    d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" />
                <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" />
                <path d="m8 22 1-4" />
            </svg>
        </div>

        <div class="flex flex-col justify-center">
            <p class="text-center">
                vous n'avez effectuer aucun reparation
            </p>
        </div>
    </div>
</template>