<template>
  <label
    data-testid="toggle-root"
    :class="[
      'inline-flex items-center gap-2 cursor-pointer select-none',
      props.disabled ? 'cursor-not-allowed opacity-60' : '',
      props.labelPosition === 'left' ? 'flex-row-reverse' : '',
    ]"
  >
    <span
      data-testid="toggle-track"
      :class="trackClasses"
      role="switch"
      :aria-checked="props.modelValue"
      :aria-disabled="props.disabled"
      :tabindex="props.disabled ? -1 : 0"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span :class="thumbClasses" />
    </span>
    <input
      :id="props.id"
      type="checkbox"
      data-testid="toggle-input"
      :name="props.name"
      :checked="props.modelValue"
      :disabled="props.disabled"
      class="sr-only"
      @change="toggle"
    />
    <span
      v-if="props.label"
      data-testid="toggle-label"
      class="text-sm text-[var(--color-fg0)]"
    >
      {{ props.label }}
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ToggleProps {
  modelValue: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<ToggleProps>(), {
  labelPosition: 'right',
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const sizeClasses = computed(() => {
  const sizes: Record<
    string,
    { track: string; thumb: string; translate: string }
  > = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translate-x-5' },
    lg: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  };
  return sizes[props.size];
});

const trackClasses = computed(() => {
  const base = `${sizeClasses.value.track} rounded-full transition-colors duration-200 relative`;

  if (props.disabled) {
    return `${base} ${props.modelValue ? 'bg-[var(--color-blue)]/50' : 'bg-[var(--color-bg2)]'} cursor-not-allowed`;
  }

  return `${base} ${props.modelValue ? 'bg-[var(--color-blue)]' : 'bg-[var(--color-bg3)]'} cursor-pointer`;
});

const thumbClasses = computed(() => {
  const base = `${sizeClasses.value.thumb} rounded-full bg-white shadow-sm transition-transform duration-200 absolute top-0.5 left-0.5`;

  if (props.modelValue) {
    return `${base} ${sizeClasses.value.translate}`;
  }

  return base;
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
