<template>
  <div
    data-testid="radio-group-root"
    role="radiogroup"
    :aria-disabled="props.disabled"
    :class="[
      'flex gap-3',
      props.direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
    ]"
  >
    <Radio
      v-for="option in props.options"
      :key="option.value"
      :model-value="props.modelValue"
      :value="option.value"
      :name="props.name"
      :label="option.label"
      :disabled="props.disabled || option.disabled"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import Radio from './Radio.vue';

interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  modelValue: string | number;
  name: string;
  options: RadioOption[];
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  error?: string | boolean;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'vertical',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

function handleUpdate(value: string | number) {
  emit('update:modelValue', value);
}
</script>
