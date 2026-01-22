<template>
  <div class="relative inline-block" data-testid="avatar-root">
    <div
      data-testid="avatar-content"
      :class="[
        'flex items-center justify-center overflow-hidden bg-[var(--color-bg2)] text-[var(--color-fg0)] font-medium',
        sizeClasses[props.size].container,
        sizeClasses[props.size].text,
        roundedClass,
      ]"
    >
      <img
        v-if="showImage"
        data-testid="avatar-image"
        :src="props.src"
        :alt="props.alt || props.name || 'Avatar'"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <span v-else-if="initials">
        {{ initials }}
      </span>
      <Icon
        v-else
        name="User"
        :size="props.size === 'xs' || props.size === 'sm' ? 'sm' : 'md'"
      />
    </div>
    <span
      v-if="props.status"
      :class="[
        'absolute bottom-0 right-0 rounded-full border-2 border-[var(--color-bg0)]',
        sizeClasses[props.size].status,
        statusColors[props.status],
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Icon from './Icon.vue';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'full' | 'md';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  rounded: 'full',
});

const imageError = ref(false);

const sizeClasses: Record<
  string,
  { container: string; text: string; status: string }
> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-1.5 h-1.5' },
  sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2 h-2' },
  md: { container: 'w-10 h-10', text: 'text-base', status: 'w-2.5 h-2.5' },
  lg: { container: 'w-12 h-12', text: 'text-lg', status: 'w-3 h-3' },
  xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-3.5 h-3.5' },
};

const statusColors: Record<string, string> = {
  online: 'bg-[var(--color-green)]',
  offline: 'bg-[var(--color-fg4)]',
  busy: 'bg-[var(--color-red)]',
  away: 'bg-[var(--color-yellow)]',
};

const initials = computed(() => {
  if (!props.name) return '';
  return props.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
});

const roundedClass = computed(() => {
  return props.rounded === 'full' ? 'rounded-full' : 'rounded-md';
});

const showImage = computed(() => {
  return props.src && !imageError.value;
});

function handleImageError() {
  imageError.value = true;
}
</script>
