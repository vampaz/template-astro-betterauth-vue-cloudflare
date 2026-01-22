<template>
  <label
    data-testid="checkbox-root"
    :class="[
      'inline-flex items-center gap-2 cursor-pointer select-none',
      props.disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
  >
    <span
      data-testid="checkbox-control"
      :class="checkboxClasses"
      role="checkbox"
      :aria-checked="props.indeterminate ? 'mixed' : props.modelValue"
      :aria-disabled="props.disabled"
      :tabindex="props.disabled ? -1 : 0"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <Icon
        v-if="props.modelValue && !props.indeterminate"
        name="Checkmark"
        size="xs"
        class="text-white"
      />
      <span
        v-else-if="props.indeterminate"
        class="w-2 h-0.5 bg-white rounded"
      />
    </span>
    <input
      type="checkbox"
      data-testid="checkbox-input"
      :id="props.id"
      :name="props.name"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :indeterminate="props.indeterminate"
      class="sr-only"
      @change="toggle"
    />
    <span
      v-if="props.label"
      data-testid="checkbox-label"
      class="text-sm text-[var(--color-fg0)]"
    >
      {{ props.label }}
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from './Icon.vue';

interface CheckboxProps {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: string | boolean;
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const checkboxClasses = computed(() => {
  const base =
    'w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0';

  if (props.disabled) {
    return `${base} bg-[var(--color-bg1)] border-[var(--color-bg3)] cursor-not-allowed`;
  }

  if (props.error) {
    return `${base} border-[var(--color-red)] ${props.modelValue || props.indeterminate ? 'bg-[var(--color-red)]' : 'bg-transparent'}`;
  }

  if (props.modelValue || props.indeterminate) {
    return `${base} bg-[var(--color-blue)] border-[var(--color-blue)]`;
  }

  return `${base} border-[var(--color-bg3)] bg-transparent hover:border-[var(--color-blue)]`;
});

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggle();
  }
}
</script>
