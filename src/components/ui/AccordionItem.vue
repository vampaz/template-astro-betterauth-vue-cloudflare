<template>
  <div class="bg-[var(--color-bg0)]" data-testid="accordion-item-root">
    <button
      type="button"
      data-testid="accordion-item-trigger"
      :id="`accordion-header-${props.id}`"
      :class="[
        'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
        props.disabled
          ? 'text-[var(--color-fg4)] cursor-not-allowed'
          : 'text-[var(--color-fg0)] hover:bg-[var(--color-bg1)]',
      ]"
      :aria-expanded="isOpen"
      :aria-controls="`accordion-content-${props.id}`"
      :aria-disabled="props.disabled"
      :tabindex="props.disabled ? -1 : 0"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <div class="flex items-center gap-2">
        <Icon
          v-if="props.icon"
          :name="props.icon"
          size="md"
          class="text-[var(--color-fg4)]"
        />
        <slot name="header">
          <span class="font-medium">{{ props.title }}</span>
        </slot>
      </div>
      <Icon
        name="ChevronDown"
        size="md"
        :class="[
          'transition-transform duration-200 text-[var(--color-fg4)]',
          isOpen ? 'rotate-180' : '',
        ]"
      />
    </button>
    <div
      :id="`accordion-content-${props.id}`"
      role="region"
      data-testid="accordion-item-content"
      :aria-labelledby="`accordion-header-${props.id}`"
      class="grid transition-[grid-template-rows] duration-200 ease-out"
      :style="{ gridTemplateRows: isOpen ? '1fr' : '0fr' }"
    >
      <div class="overflow-hidden min-h-0">
        <div class="px-4 pb-4 text-sm text-[var(--color-fg1)]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import Icon from './Icon.vue';

interface AccordionItemProps {
  id: string;
  title: string;
  disabled?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
});

interface AccordionContext {
  toggleItem: (id: string) => void;
  isOpen: (id: string) => boolean;
  bordered: boolean;
}

const accordion = inject<AccordionContext>('accordion');

const isOpen = computed(() => accordion?.isOpen(props.id) ?? false);

function toggle() {
  if (!props.disabled) {
    accordion?.toggleItem(props.id);
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggle();
  }
}
</script>
