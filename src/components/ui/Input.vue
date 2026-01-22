<template>
  <div class="relative" data-testid="input-root">
    <div
      v-if="props.prefix"
      data-testid="input-prefix"
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-fg4)]"
    >
      {{ props.prefix }}
    </div>
    <input
      :id="props.id"
      ref="inputRef"
      data-testid="input-input"
      :name="props.name"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :maxlength="props.maxlength"
      :autocomplete="props.autocomplete"
      :aria-invalid="!!props.error"
      :aria-describedby="
        props.error && typeof props.error === 'string'
          ? `${props.id}-error`
          : undefined
      "
      :class="[
        'w-full rounded-md border bg-[var(--color-bg0)] text-[var(--color-fg0)] placeholder-[var(--color-fg4)] transition-colors duration-150 focus:outline-none focus:ring-1',
        sizeClasses[props.size],
        stateClasses,
        props.prefix ? 'pl-8' : '',
        props.suffix ? 'pr-8' : '',
      ]"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <div
      v-if="props.suffix"
      data-testid="input-suffix"
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[var(--color-fg4)]"
    >
      {{ props.suffix }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface InputProps {
  modelValue: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'number';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | boolean;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
  suffix?: string;
  maxlength?: number;
  autocomplete?: string;
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

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
    return 'border-[var(--color-red)] focus:border-[var(--color-red)] focus:ring-[var(--color-red)]';
  }
  if (props.success) {
    return 'border-[var(--color-green)] focus:border-[var(--color-green)] focus:ring-[var(--color-green)]';
  }
  return 'border-[var(--color-bg3)] focus:border-[var(--color-blue)] focus:ring-[var(--color-blue)]';
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

function focus() {
  inputRef.value?.focus();
}

defineExpose({ focus, inputRef });
</script>
