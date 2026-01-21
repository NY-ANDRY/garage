<script setup lang="ts">
const props = defineProps<{
    label?: string
}>();

</script>

<template>
    <button v-bind="$attrs" class="w-full h-full bg-neutral-50 text-neutral-800 active:bg-neutral-200 transition-all font-[interT] rounded-2xl">
        <slot></slot>
    </button>
</template>

<style>

button {
    padding: 16px 8px;
    border-radius: 8px;
    font-family: inherit;
    font-style: inherit;
    font-variant: inherit;
    line-height: 1;
    text-transform: none;
    cursor: pointer;
}

</style>