<template>
  <div data-testid="form-field-root" :class="containerClasses">
    <div data-testid="form-field-label" :class="labelContainerClasses">
      <Label
        :for="props.for"
        :required="props.required"
        :optional="props.optional"
        :hint="props.orientation === 'vertical' ? undefined : props.hint"
      >
        {{ props.label }}
      </Label>
    </div>
    <div data-testid="form-field-input" :class="inputContainerClasses">
      <slot />
      <p
        v-if="props.hint && props.orientation === 'vertical'"
        data-testid="form-field-hint"
        class="mt-1 text-xs text-[var(--color-fg4)]"
      >
        {{ props.hint }}
      </p>
      <p
        v-if="props.error"
        :id="props.for ? `${props.for}-error` : undefined"
        data-testid="form-field-error"
        class="mt-1 text-xs text-[var(--color-red)]"
        role="alert"
      >
        {{ props.error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Label from './Label.vue';

interface FormFieldProps {
  label: string;
  for?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  orientation?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  orientation: 'vertical',
  required: false,
  optional: false,
});

const containerClasses = computed(() => {
  if (props.orientation === 'horizontal') {
    return 'flex flex-row items-start gap-4';
  }
  return 'flex flex-col gap-1.5';
});

const labelContainerClasses = computed(() => {
  if (props.orientation === 'horizontal') {
    return 'w-1/3 pt-2';
  }
  return '';
});

const inputContainerClasses = computed(() => {
  if (props.orientation === 'horizontal') {
    return 'flex-1';
  }
  return '';
});
</script>
