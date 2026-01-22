<template>
  <div
    ref="dropdownRef"
    class="relative inline-block"
    data-testid="dropdown-root"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @keydown="handleKeydown"
  >
    <div
      data-testid="dropdown-trigger"
      @click="props.trigger === 'click' ? toggle() : undefined"
    >
      <slot name="trigger" :is-open="isOpen" />
    </div>
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        data-testid="dropdown-menu"
        :class="[
          'absolute z-50 min-w-[160px] py-1 rounded-md border border-[var(--color-bg2)] bg-[var(--color-bg0)] shadow-lg',
          positionClasses[props.position],
        ]"
        role="menu"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';

interface DropdownProps {
  trigger?: 'click' | 'hover';
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  disabled?: boolean;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: 'click',
  position: 'bottom-start',
  disabled: false,
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

const positionClasses: Record<string, string> = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    close();
  }
}

function handleMouseEnter() {
  if (props.trigger !== 'hover' || props.disabled) return;
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }
  isOpen.value = true;
}

function handleMouseLeave() {
  if (props.trigger !== 'hover') return;
  hoverTimeout = setTimeout(() => {
    isOpen.value = false;
  }, 150);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

provide('dropdown', { close });

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (hoverTimeout) clearTimeout(hoverTimeout);
});
</script>
