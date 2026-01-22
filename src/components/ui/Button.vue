<template>
  <button
    :type="props.type"
    :title="props.title"
    data-testid="button-root"
    :class="[
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      props.fullWidth ? 'w-full' : '',
      props.loading ? 'relative' : '',
    ]"
    :disabled="props.disabled || props.loading"
    :aria-disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    @click="handleClick"
  >
    <span :class="{ 'opacity-0': props.loading }">
      <slot />
    </span>
    <span
      v-if="props.loading"
      data-testid="button-loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <Spinner :size="props.size === 'lg' ? 'md' : 'sm'" />
    </span>
  </button>
</template>

<script setup lang="ts">
import Spinner from './Spinner.vue';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed';

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-md',
};

const variantClasses: Record<string, string> = {
  primary:
    'bg-[var(--color-blue)] text-white hover:bg-[var(--color-blueBright)] focus-visible:ring-[var(--color-blue)] disabled:opacity-50',
  secondary:
    'bg-transparent border border-[var(--color-bg3)] text-[var(--color-fg1)] hover:bg-[var(--color-bg1)] focus-visible:ring-[var(--color-bg3)] disabled:opacity-50',
  ghost:
    'bg-transparent text-[var(--color-fg1)] hover:bg-[var(--color-bg1)] focus-visible:ring-[var(--color-bg2)] disabled:opacity-50',
  danger:
    'bg-[var(--color-red)] text-white hover:bg-[var(--color-redBright)] focus-visible:ring-[var(--color-red)] disabled:opacity-50',
  link: 'bg-transparent text-[var(--color-blue)] hover:underline focus-visible:ring-[var(--color-blue)] p-0 disabled:opacity-50',
};

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>
