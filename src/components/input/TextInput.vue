<script setup lang="ts">

const props = defineProps<{
  label?: string;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm text-neutral-500 font-[inter-t]">{{ label }}</label>
    <input
      :value="props.modelValue"
      @input="updateValue"
      v-bind="$attrs"
      class="py-2 outline-0 border-b border-neutral-200 text-neutral-600"
    />
  </div>
</template>
