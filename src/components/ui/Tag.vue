<template>
  <span
    data-testid="tag-root"
    :class="[
      'inline-flex items-center gap-1 rounded-md border border-[var(--color-bg3)] bg-[var(--color-bg1)] text-[var(--color-fg0)] transition-colors',
      sizeClasses[props.size],
      props.disabled ? 'opacity-60 cursor-not-allowed' : '',
    ]"
    :style="
      props.color ? { borderColor: props.color, color: props.color } : undefined
    "
  >
    {{ props.label }}
    <button
      v-if="props.removable"
      type="button"
      data-testid="tag-remove"
      :class="[
        'p-0.5 rounded hover:bg-[var(--color-bg2)] transition-colors -mr-1',
        props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      :disabled="props.disabled"
      aria-label="Remove tag"
      @click="handleRemove"
    >
      <Icon name="Close" size="xs" />
    </button>
  </span>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

interface TagProps {
  label: string;
  removable?: boolean;
  disabled?: boolean;
  color?: string;
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<TagProps>(), {
  size: 'md',
  removable: false,
  disabled: false,
});

const emit = defineEmits<{
  remove: [];
}>();

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

function handleRemove(event: MouseEvent) {
  event.stopPropagation();
  if (!props.disabled) {
    emit('remove');
  }
}
</script>
