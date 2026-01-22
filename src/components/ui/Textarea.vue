<template>
  <textarea
    :id="props.id"
    ref="textareaRef"
    data-testid="textarea-root"
    :name="props.name"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :rows="props.rows"
    :maxlength="props.maxlength"
    :aria-invalid="!!props.error"
    :aria-describedby="
      props.error && typeof props.error === 'string'
        ? `${props.id}-error`
        : undefined
    "
    :class="[
      'w-full px-3 py-2 text-sm rounded-md border bg-[var(--color-bg0)] text-[var(--color-fg0)] placeholder-[var(--color-fg4)] transition-colors duration-150 focus:outline-none focus:ring-1',
      stateClasses,
      resizeClass,
    ]"
    @input="handleInput"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';

interface TextareaProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  rows?: number;
  maxlength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
  resize: 'vertical',
  autoResize: false,
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const stateClasses = computed(() => {
  if (props.disabled) {
    return 'bg-[var(--color-bg1)] text-[var(--color-fg4)] cursor-not-allowed border-[var(--color-bg2)]';
  }
  if (props.error) {
    return 'border-[var(--color-red)] focus:border-[var(--color-red)] focus:ring-[var(--color-red)]';
  }
  return 'border-[var(--color-bg3)] focus:border-[var(--color-blue)] focus:ring-[var(--color-blue)]';
});

const resizeClass = computed(() => {
  const map: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };
  return props.autoResize ? 'resize-none overflow-hidden' : map[props.resize];
});

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  if (props.autoResize) {
    adjustHeight();
  }
}

function adjustHeight() {
  if (!textareaRef.value) return;
  textareaRef.value.style.height = 'auto';
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
}

function focus() {
  textareaRef.value?.focus();
}

watch(
  () => props.modelValue,
  () => {
    if (props.autoResize) {
      nextTick(adjustHeight);
    }
  },
);

onMounted(() => {
  if (props.autoResize) {
    adjustHeight();
  }
});

defineExpose({ focus, textareaRef });
</script>
