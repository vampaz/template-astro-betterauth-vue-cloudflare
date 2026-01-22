<template>
  <div data-testid="label-root" class="flex flex-col gap-1">
    <label
      :for="props.for"
      data-testid="label-text"
      class="text-sm font-medium text-[var(--color-fg0)]"
    >
      <slot />
      <span v-if="props.required" class="text-[var(--color-red)] ml-0.5"
        >*</span
      >
      <span v-if="props.optional" class="text-[var(--color-fg4)] text-xs ml-1"
        >(optional)</span
      >
    </label>
    <span
      v-if="props.hint"
      data-testid="label-hint"
      class="text-xs text-[var(--color-fg4)]"
    >
      {{ props.hint }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface LabelProps {
  for?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  optional: false,
});
</script>
