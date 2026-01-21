<script setup lang="ts">
import { IonButton } from '@ionic/vue';
const props = defineProps<{
    label?: string
}>();

</script>

<template>
    <button v-bind="$attrs" class="w-full h-full bg- bg-neutral-900 text-neutral-200 active:bg-neutral-700 transition-all font-[interT] rounded-2xl">
        <slot></slot>
    </button>
</template>

<style>

button {
    padding: 12px 8px;
    border-radius: 8px;
    font-family: inherit;
    font-style: inherit;
    font-variant: inherit;
    line-height: 1;
    text-transform: none;
    cursor: pointer;
}

</style>