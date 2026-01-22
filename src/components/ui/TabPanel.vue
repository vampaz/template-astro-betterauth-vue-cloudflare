<template>
  <div
    v-if="!props.lazy || hasBeenActive"
    v-show="isActive"
    data-testid="tab-panel-root"
    role="tabpanel"
    :aria-hidden="!isActive"
    :tabindex="isActive ? 0 : -1"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';

interface TabPanelProps {
  id: string | number;
  lazy?: boolean;
}

const props = withDefaults(defineProps<TabPanelProps>(), {
  lazy: false,
});

const activeTab = inject<Ref<string | number>>('activeTab');

const isActive = computed(() => activeTab?.value === props.id);

const hasBeenActive = computed(() => {
  if (props.lazy && isActive.value) {
    return true;
  }
  return isActive.value;
});
</script>
