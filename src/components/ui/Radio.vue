<template>
  <label
    data-testid="radio-root"
    :class="[
      'inline-flex items-center gap-2 cursor-pointer select-none',
      props.disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
  >
    <span
      data-testid="radio-control"
      :class="radioClasses"
      role="radio"
      :aria-checked="isSelected"
      :aria-disabled="props.disabled"
      :tabindex="props.disabled ? -1 : 0"
      @click="select"
      @keydown="handleKeydown"
    >
      <span
        v-if="isSelected"
        :class="[
          'w-2 h-2 rounded-full transition-transform duration-150',
          props.disabled ? 'bg-[var(--color-fg4)]' : 'bg-[var(--color-blue)]',
        ]"
      />
    </span>
    <input
      type="radio"
      data-testid="radio-input"
      :id="props.id"
      :name="props.name"
      :value="props.value"
      :checked="isSelected"
      :disabled="props.disabled"
      class="sr-only"
      @change="select"
    />
    <span
      v-if="props.label"
      data-testid="radio-label"
      class="text-sm text-[var(--color-fg0)]"
    >
      {{ props.label }}
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface RadioProps {
  modelValue: string | number;
  value: string | number;
  name: string;
  label?: string;
  disabled?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const isSelected = computed(() => props.modelValue === props.value);

const radioClasses = computed(() => {
  const base =
    'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0';

  if (props.disabled) {
    return `${base} bg-[var(--color-bg1)] border-[var(--color-bg3)] cursor-not-allowed`;
  }

  if (isSelected.value) {
    return `${base} border-[var(--color-blue)]`;
  }

  return `${base} border-[var(--color-bg3)] hover:border-[var(--color-blue)]`;
});

function select() {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    select();
  }
}
</script>
