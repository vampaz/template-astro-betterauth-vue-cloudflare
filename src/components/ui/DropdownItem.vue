<template>
  <button
    type="button"
    data-testid="dropdown-item-root"
    :class="[
      'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors',
      props.disabled
        ? 'text-[var(--color-fg4)] cursor-not-allowed'
        : props.danger
          ? 'text-[var(--color-red)] hover:bg-[var(--color-red)]/10'
          : 'text-[var(--color-fg0)] hover:bg-[var(--color-bg1)]',
    ]"
    role="menuitem"
    :disabled="props.disabled"
    :tabindex="props.disabled ? -1 : 0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <Icon
      v-if="props.icon"
      :name="props.icon"
      size="sm"
      :class="
        props.danger ? 'text-[var(--color-red)]' : 'text-[var(--color-fg4)]'
      "
    />
    <span class="flex-1">
      <slot />
    </span>
    <span v-if="props.shortcut" class="text-xs text-[var(--color-fg4)]">
      {{ props.shortcut }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import Icon from './Icon.vue';

interface DropdownItemProps {
  disabled?: boolean;
  danger?: boolean;
  icon?: string;
  shortcut?: string;
}

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  danger: false,
});

const emit = defineEmits<{
  click: [];
}>();

interface DropdownContext {
  close: () => void;
}

const dropdown = inject<DropdownContext>('dropdown');

function handleClick() {
  if (props.disabled) return;
  emit('click');
  dropdown?.close();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}
</script>
