<template>
  <div
    data-testid="accordion-root"
    :class="[
      'divide-y divide-[var(--color-bg2)]',
      props.bordered
        ? 'border border-[var(--color-bg2)] rounded-lg overflow-hidden'
        : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';

interface AccordionProps {
  modelValue?: string | string[];
  multiple?: boolean;
  bordered?: boolean;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
  bordered: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
}>();

const openItems = ref<Set<string>>(new Set());

watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined) return;
    if (Array.isArray(value)) {
      openItems.value = new Set(value);
    } else {
      openItems.value = new Set([value]);
    }
  },
  { immediate: true },
);

function toggleItem(id: string) {
  const newOpenItems = new Set(openItems.value);

  if (newOpenItems.has(id)) {
    newOpenItems.delete(id);
  } else {
    if (!props.multiple) {
      newOpenItems.clear();
    }
    newOpenItems.add(id);
  }

  openItems.value = newOpenItems;

  const newValue = props.multiple
    ? Array.from(newOpenItems)
    : newOpenItems.size > 0
      ? Array.from(newOpenItems)[0]
      : '';

  emit('update:modelValue', newValue);
}

function isOpen(id: string): boolean {
  return openItems.value.has(id);
}

provide('accordion', {
  toggleItem,
  isOpen,
  bordered: props.bordered,
});
</script>
