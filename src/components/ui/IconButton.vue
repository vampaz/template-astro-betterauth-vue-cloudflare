<template>
  <button
    type="button"
    data-testid="icon-button-root"
    :class="[
      'inline-flex items-center justify-center rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[props.size],
      variantClasses[props.variant],
    ]"
    :disabled="props.disabled || props.loading"
    :aria-label="props.label"
    :title="props.title || props.label"
    :aria-disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    @click="handleClick"
  >
    <Spinner v-if="props.loading" :size="iconSizes[props.size]" />
    <Icon v-else :name="props.icon" :size="iconSizes[props.size]" />
  </button>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import Spinner from './Spinner.vue';

interface IconButtonProps {
  icon: string;
  label: string;
  title?: string;
  variant?: 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: 'ghost',
  size: 'md',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const sizeClasses: Record<string, string> = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

const iconSizes: Record<string, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const variantClasses: Record<string, string> = {
  ghost:
    'bg-transparent text-[var(--color-fg2)] hover:bg-[var(--color-bg1)] hover:text-[var(--color-fg0)] focus-visible:ring-[var(--color-bg2)]',
  solid:
    'bg-[var(--color-bg1)] text-[var(--color-fg1)] hover:bg-[var(--color-bg2)] focus-visible:ring-[var(--color-bg3)]',
};

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>
