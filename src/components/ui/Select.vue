<template>
  <div ref="selectRef" class="relative" data-testid="select-root">
    <div
      data-testid="select-trigger"
      :class="[
        'flex items-center justify-between w-full rounded-md border bg-[var(--color-bg0)] text-[var(--color-fg0)] cursor-pointer transition-colors duration-150 focus-within:outline-none focus-within:ring-1',
        sizeClasses[props.size],
        stateClasses,
      ]"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-disabled="props.disabled"
      tabindex="0"
      @click="toggleOpen"
      @keydown="handleKeydown"
    >
      <input
        v-if="props.searchable && isOpen"
        ref="inputRef"
        data-testid="select-search-input"
        v-model="searchQuery"
        type="text"
        class="flex-1 bg-transparent border-none outline-none text-[var(--color-fg0)] placeholder-[var(--color-fg4)]"
        :placeholder="displayValue || props.placeholder"
        @click.stop
      />
      <span
        v-else
        data-testid="select-display"
        :class="{ 'text-[var(--color-fg4)]': !selectedOption }"
      >
        {{ displayValue || props.placeholder }}
      </span>
      <div class="flex items-center gap-1 ml-2">
        <button
          v-if="props.clearable && selectedOption"
          type="button"
          data-testid="select-clear"
          class="p-0.5 rounded hover:bg-[var(--color-bg2)] text-[var(--color-fg4)] hover:text-[var(--color-fg0)]"
          aria-label="Clear selection"
          @click="clear"
        >
          <Icon name="Close" size="sm" />
        </button>
        <Icon
          name="ChevronDown"
          size="sm"
          :class="[
            'transition-transform duration-150 text-[var(--color-fg4)]',
            isOpen ? 'rotate-180' : '',
          ]"
        />
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        data-testid="select-menu"
        class="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border border-[var(--color-bg2)] bg-[var(--color-bg0)] py-1 shadow-lg"
        role="listbox"
      >
        <template v-if="groupedOptions.ungrouped.length">
          <li
            v-for="(option, index) in groupedOptions.ungrouped"
            :key="option.value"
            data-testid="select-option"
            :class="[
              'px-3 py-2 cursor-pointer transition-colors',
              option.disabled
                ? 'text-[var(--color-fg4)] cursor-not-allowed'
                : 'text-[var(--color-fg0)]',
              option.value === props.modelValue ? 'bg-[var(--color-bg2)]' : '',
              highlightedIndex === index && !option.disabled
                ? 'bg-[var(--color-bg1)]'
                : '',
              !option.disabled ? 'hover:bg-[var(--color-bg1)]' : '',
            ]"
            role="option"
            :aria-selected="option.value === props.modelValue"
            :aria-disabled="option.disabled"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            {{ option.label }}
          </li>
        </template>

        <template
          v-for="(groupOptions, groupName) in groupedOptions.groups"
          :key="groupName"
        >
          <li
            data-testid="select-group-label"
            class="px-3 py-1.5 text-xs font-semibold text-[var(--color-fg4)] uppercase tracking-wider"
          >
            {{ groupName }}
          </li>
          <li
            v-for="option in groupOptions"
            :key="option.value"
            data-testid="select-option"
            :class="[
              'px-3 py-2 cursor-pointer transition-colors',
              option.disabled
                ? 'text-[var(--color-fg4)] cursor-not-allowed'
                : 'text-[var(--color-fg0)]',
              option.value === props.modelValue ? 'bg-[var(--color-bg2)]' : '',
              !option.disabled ? 'hover:bg-[var(--color-bg1)]' : '',
            ]"
            role="option"
            :aria-selected="option.value === props.modelValue"
            :aria-disabled="option.disabled"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </template>

        <li
          v-if="filteredOptions.length === 0"
          data-testid="select-empty"
          class="px-3 py-2 text-[var(--color-fg4)] text-center"
        >
          No options found
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import Icon from './Icon.vue';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

interface SelectProps {
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string | boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Select...',
  size: 'md',
  disabled: false,
  searchable: false,
  clearable: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const highlightedIndex = ref(-1);
const selectRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const sizeClasses: Record<string, string> = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const stateClasses = computed(() => {
  if (props.disabled) {
    return 'bg-[var(--color-bg1)] text-[var(--color-fg4)] cursor-not-allowed border-[var(--color-bg2)]';
  }
  if (props.error) {
    return 'border-[var(--color-red)] focus-within:border-[var(--color-red)] focus-within:ring-[var(--color-red)]';
  }
  return 'border-[var(--color-bg3)] focus-within:border-[var(--color-blue)] focus-within:ring-[var(--color-blue)]';
});

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

const displayValue = computed(() => {
  return selectedOption.value?.label || '';
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options;
  }
  const query = searchQuery.value.toLowerCase();
  return props.options.filter((opt) => opt.label.toLowerCase().includes(query));
});

const groupedOptions = computed(() => {
  const groups: Record<string, SelectOption[]> = {};
  const ungrouped: SelectOption[] = [];

  filteredOptions.value.forEach((opt) => {
    if (opt.group) {
      if (!groups[opt.group]) groups[opt.group] = [];
      groups[opt.group].push(opt);
    } else {
      ungrouped.push(opt);
    }
  });

  return { groups, ungrouped };
});

function toggleOpen() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = '';
    highlightedIndex.value = -1;
    setTimeout(() => inputRef.value?.focus(), 0);
  }
}

function selectOption(option: SelectOption) {
  if (option.disabled) return;
  emit('update:modelValue', option.value);
  isOpen.value = false;
  searchQuery.value = '';
}

function clear(event: MouseEvent) {
  event.stopPropagation();
  emit('update:modelValue', null);
  searchQuery.value = '';
}

function handleKeydown(event: KeyboardEvent) {
  if (
    !isOpen.value &&
    (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
  ) {
    event.preventDefault();
    isOpen.value = true;
    return;
  }

  if (!isOpen.value) return;

  const enabledOptions = filteredOptions.value.filter((opt) => !opt.disabled);

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        enabledOptions.length - 1,
      );
      break;
    case 'ArrowUp':
      event.preventDefault();
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0);
      break;
    case 'Enter':
      event.preventDefault();
      if (
        highlightedIndex.value >= 0 &&
        enabledOptions[highlightedIndex.value]
      ) {
        selectOption(enabledOptions[highlightedIndex.value]);
      }
      break;
    case 'Escape':
      event.preventDefault();
      isOpen.value = false;
      break;
  }
}

function handleClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
