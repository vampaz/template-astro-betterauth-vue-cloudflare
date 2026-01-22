<template>
  <div data-testid="card-root" :class="cardClasses" @click="handleClick">
    <div
      v-if="$slots.header"
      data-testid="card-header"
      class="px-4 py-3 border-b border-[var(--color-bg2)]"
    >
      <slot name="header" />
    </div>
    <div data-testid="card-body" :class="paddingClasses[props.padding]">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      data-testid="card-footer"
      class="px-4 py-3 border-t border-[var(--color-bg2)] flex items-center justify-end gap-2"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface CardProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  bordered?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  hoverable: false,
  clickable: false,
  bordered: true,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const cardClasses = computed(() => {
  const classes = [
    'rounded-lg bg-[var(--color-bg1)]',
    props.bordered ? 'border border-[var(--color-bg2)]' : '',
    props.hoverable
      ? 'transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg'
      : '',
    props.clickable ? 'cursor-pointer' : '',
  ];
  return classes.filter(Boolean).join(' ');
});

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event);
  }
}
</script>
