<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="isVisible"
      data-testid="alert-root"
      :class="['rounded-lg border p-4', config.bg, config.border]"
      :role="props.variant === 'error' ? 'alert' : 'status'"
    >
      <div class="flex gap-3">
        <Icon
          v-if="props.icon"
          :name="config.icon"
          :class="['flex-shrink-0 mt-0.5', config.text]"
          size="md"
        />
        <div class="flex-1 min-w-0">
          <h4 v-if="props.title" :class="['font-medium mb-1', config.text]">
            {{ props.title }}
          </h4>
          <div class="text-sm text-[var(--color-fg1)]">
            <slot />
          </div>
          <div v-if="$slots.action" class="mt-3">
            <slot name="action" />
          </div>
        </div>
        <button
          v-if="props.dismissible"
          type="button"
          data-testid="alert-dismiss"
          class="flex-shrink-0 p-1 rounded hover:bg-[var(--color-bg2)] transition-colors text-[var(--color-fg4)] hover:text-[var(--color-fg0)]"
          aria-label="Dismiss"
          @click="dismiss"
        >
          <Icon name="Close" size="sm" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Icon from './Icon.vue';

interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<AlertProps>(), {
  dismissible: false,
  icon: true,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const isVisible = ref(true);

const variantConfig: Record<
  string,
  { bg: string; border: string; text: string; icon: string }
> = {
  info: {
    bg: 'bg-[var(--color-blue)]/10',
    border: 'border-[var(--color-blue)]/30',
    text: 'text-[var(--color-blueBright)]',
    icon: 'Information',
  },
  success: {
    bg: 'bg-[var(--color-green)]/10',
    border: 'border-[var(--color-green)]/30',
    text: 'text-[var(--color-greenBright)]',
    icon: 'CheckmarkFilled',
  },
  warning: {
    bg: 'bg-[var(--color-yellow)]/10',
    border: 'border-[var(--color-yellow)]/30',
    text: 'text-[var(--color-yellowBright)]',
    icon: 'Warning',
  },
  error: {
    bg: 'bg-[var(--color-red)]/10',
    border: 'border-[var(--color-red)]/30',
    text: 'text-[var(--color-redBright)]',
    icon: 'Error',
  },
};

const config = computed(() => variantConfig[props.variant]);

function dismiss() {
  isVisible.value = false;
  emit('dismiss');
}
</script>
