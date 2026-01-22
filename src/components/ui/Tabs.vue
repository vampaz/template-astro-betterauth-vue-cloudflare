<template>
  <div data-testid="tabs-root">
    <div
      v-if="props.items"
      data-testid="tabs-list"
      :class="tabListClasses"
      role="tablist"
    >
      <button
        v-for="item in props.items"
        :key="item.id"
        type="button"
        data-testid="tabs-tab"
        :class="getTabClasses(item)"
        role="tab"
        :aria-selected="item.id === props.modelValue"
        :aria-disabled="item.disabled"
        :tabindex="item.id === props.modelValue ? 0 : -1"
        @click="selectTab(item)"
        @keydown="handleKeydown($event)"
      >
        {{ item.label }}
        <Badge v-if="item.badge !== undefined" variant="primary" size="sm">
          {{ item.badge }}
        </Badge>
      </button>
    </div>
    <slot v-else name="tabs" />
    <div data-testid="tabs-content" class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import Badge from './Badge.vue';

interface TabItem {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps {
  modelValue: string | number;
  items?: TabItem[];
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'default',
  size: 'md',
  fullWidth: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

provide('activeTab', activeTab);
provide('tabsVariant', props.variant);

const tabListClasses = computed(() => {
  const base = 'flex';
  const variants: Record<string, string> = {
    default: 'border-b border-[var(--color-bg2)] gap-0',
    pills: 'bg-[var(--color-bg1)] rounded-lg p-1 gap-1',
    underline: 'gap-4',
  };
  return `${base} ${variants[props.variant]} ${props.fullWidth ? 'w-full' : ''}`;
});

function getTabClasses(item: TabItem) {
  const isActive = item.id === props.modelValue;
  const base =
    'inline-flex items-center gap-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)] focus-visible:ring-offset-2';
  const sizeClasses =
    props.size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';

  if (item.disabled) {
    return `${base} ${sizeClasses} text-[var(--color-fg4)] cursor-not-allowed`;
  }

  const variants: Record<string, { active: string; inactive: string }> = {
    default: {
      active:
        'border-b-2 border-[var(--color-blue)] text-[var(--color-blue)] -mb-px',
      inactive:
        'border-b-2 border-transparent text-[var(--color-fg4)] hover:text-[var(--color-fg0)] -mb-px',
    },
    pills: {
      active:
        'bg-[var(--color-bg0)] text-[var(--color-fg0)] rounded-md shadow-sm',
      inactive:
        'text-[var(--color-fg4)] hover:text-[var(--color-fg0)] rounded-md',
    },
    underline: {
      active:
        'border-b-2 border-[var(--color-blue)] text-[var(--color-blue)] pb-2',
      inactive:
        'border-b-2 border-transparent text-[var(--color-fg4)] hover:text-[var(--color-fg0)] pb-2',
    },
  };

  const variantClasses = isActive
    ? variants[props.variant].active
    : variants[props.variant].inactive;
  const widthClass = props.fullWidth ? 'flex-1 justify-center' : '';

  return `${base} ${sizeClasses} ${variantClasses} ${widthClass}`;
}

function selectTab(item: TabItem) {
  if (!item.disabled) {
    activeTab.value = item.id;
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.items) return;

  const enabledItems = props.items.filter((item) => !item.disabled);
  const currentIndex = enabledItems.findIndex(
    (item) => item.id === props.modelValue,
  );

  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1;
      break;
    case 'ArrowRight':
      event.preventDefault();
      newIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = enabledItems.length - 1;
      break;
  }

  if (newIndex !== currentIndex && enabledItems[newIndex]) {
    activeTab.value = enabledItems[newIndex].id;
  }
}
</script>
