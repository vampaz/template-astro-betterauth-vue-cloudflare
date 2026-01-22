<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="props.modelValue"
        data-testid="modal-overlay"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="props.title ? 'modal-title' : undefined"
        @click="handleOverlayClick"
        @keydown="handleKeydown"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="props.modelValue"
            ref="modalRef"
            data-testid="modal-panel"
            :class="[
              'w-full rounded-lg bg-[var(--color-bg0)] border border-[var(--color-bg2)] shadow-xl',
              sizeClasses[props.size],
            ]"
          >
            <div
              v-if="props.title || props.closable || $slots.header"
              data-testid="modal-header"
              class="flex items-center justify-between px-4 py-3 border-b border-[var(--color-bg2)]"
            >
              <slot name="header">
                <h2
                  v-if="props.title"
                  id="modal-title"
                  class="text-lg font-semibold text-[var(--color-fg0)]"
                >
                  {{ props.title }}
                </h2>
              </slot>
              <button
                v-if="props.closable"
                type="button"
                data-testid="modal-close"
                class="p-1 rounded hover:bg-[var(--color-bg1)] transition-colors text-[var(--color-fg4)] hover:text-[var(--color-fg0)]"
                aria-label="Close modal"
                @click="close"
              >
                <Icon name="Close" size="md" />
              </button>
            </div>

            <div
              data-testid="modal-body"
              class="px-4 py-4 text-[var(--color-fg1)]"
            >
              <slot />
            </div>

            <div
              v-if="$slots.footer"
              data-testid="modal-footer"
              class="flex items-center justify-end gap-2 px-4 py-3 border-t border-[var(--color-bg2)]"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import Icon from './Icon.vue';

interface ModalProps {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  persistent?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  persistent: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const modalRef = ref<HTMLDivElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)]',
};

function close() {
  if (!props.persistent) {
    emit('update:modelValue', false);
    emit('close');
  }
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget && props.closeOnOverlay) {
    close();
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape) {
    close();
  }

  if (event.key === 'Tab' && modalRef.value) {
    const focusableElements = modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previousActiveElement.value = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      await nextTick();
      const focusable = modalRef.value?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    } else {
      document.body.style.overflow = '';
      previousActiveElement.value?.focus();
    }
  },
);

onMounted(() => {
  if (props.modelValue) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>
