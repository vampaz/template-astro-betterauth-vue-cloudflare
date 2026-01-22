<template>
  <span
    v-if="props.dot"
    data-testid="badge-dot"
    :class="[
      'inline-block rounded-full',
      sizeClasses,
      dotColors[props.variant],
    ]"
  />
  <span
    v-else
    data-testid="badge-root"
    :class="[
      'inline-flex items-center font-medium',
      sizeClasses,
      roundedClass,
      variantClasses[props.variant],
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
  dot: false,
  rounded: true,
});

const variantClasses: Record<string, string> = {
  default: 'bg-[var(--color-bg2)] text-[var(--color-fg0)]',
  primary: 'bg-[var(--color-blue)]/20 text-[var(--color-blueBright)]',
  success: 'bg-[var(--color-green)]/20 text-[var(--color-greenBright)]',
  warning: 'bg-[var(--color-yellow)]/20 text-[var(--color-yellowBright)]',
  danger: 'bg-[var(--color-red)]/20 text-[var(--color-redBright)]',
  info: 'bg-[var(--color-aqua)]/20 text-[var(--color-aquaBright)]',
};

const dotColors: Record<string, string> = {
  default: 'bg-[var(--color-fg4)]',
  primary: 'bg-[var(--color-blue)]',
  success: 'bg-[var(--color-green)]',
  warning: 'bg-[var(--color-yellow)]',
  danger: 'bg-[var(--color-red)]',
  info: 'bg-[var(--color-aqua)]',
};

const sizeClasses = computed(() => {
  if (props.dot) {
    return props.size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';
  }
  return props.size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-xs';
});

const roundedClass = props.rounded ? 'rounded-full' : 'rounded';
</script>
