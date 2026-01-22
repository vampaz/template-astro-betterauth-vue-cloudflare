<template>
  <div
    class="relative inline-block"
    data-testid="tooltip-root"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="handleFocus"
    @focusout="handleBlur"
  >
    <div ref="triggerRef" :aria-describedby="isVisible ? 'tooltip' : undefined">
      <slot />
    </div>
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible && !props.disabled"
        id="tooltip"
        ref="tooltipRef"
        data-testid="tooltip-content"
        role="tooltip"
        :class="[
          'absolute z-50 px-2 py-1 text-xs font-medium text-[var(--color-fg0)] bg-[var(--color-bg2)] rounded shadow-lg whitespace-nowrap',
          positionClasses.tooltip,
        ]"
      >
        {{ props.content }}
        <span :class="['absolute w-0 h-0 border-4', positionClasses.arrow]" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  delay: 200,
  disabled: false,
});

const isVisible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
let showTimeout: ReturnType<typeof setTimeout> | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const positionClasses = computed(() => {
  const positions: Record<string, { tooltip: string; arrow: string }> = {
    top: {
      tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      arrow:
        'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg2)] border-x-transparent border-b-transparent',
    },
    bottom: {
      tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
      arrow:
        'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg2)] border-x-transparent border-t-transparent',
    },
    left: {
      tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
      arrow:
        'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg2)] border-y-transparent border-r-transparent',
    },
    right: {
      tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
      arrow:
        'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg2)] border-y-transparent border-l-transparent',
    },
  };
  return positions[props.position];
});

function show() {
  if (props.disabled) return;

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  showTimeout = setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
}

function hide() {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  hideTimeout = setTimeout(() => {
    isVisible.value = false;
  }, 100);
}

function handleFocus() {
  show();
}

function handleBlur() {
  hide();
}

onUnmounted(() => {
  if (showTimeout) clearTimeout(showTimeout);
  if (hideTimeout) clearTimeout(hideTimeout);
});
</script>
