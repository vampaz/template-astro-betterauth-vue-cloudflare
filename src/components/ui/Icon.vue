<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="{ 'animate-spin': props.spin }"
    :style="iconStyle"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import {
  Add16,
  Add20,
  Add24,
  Add32,
  ArrowLeft16,
  ArrowLeft20,
  ArrowLeft24,
  ArrowLeft32,
  ArrowRight16,
  ArrowRight20,
  ArrowRight24,
  ArrowRight32,
  Checkmark16,
  Checkmark20,
  Checkmark24,
  Checkmark32,
  CheckmarkFilled16,
  CheckmarkFilled20,
  CheckmarkFilled24,
  CheckmarkFilled32,
  ChevronDown16,
  ChevronDown20,
  ChevronDown24,
  ChevronDown32,
  ChevronLeft16,
  ChevronLeft20,
  ChevronLeft24,
  ChevronLeft32,
  ChevronRight16,
  ChevronRight20,
  ChevronRight24,
  ChevronRight32,
  ChevronUp16,
  ChevronUp20,
  ChevronUp24,
  ChevronUp32,
  Close16,
  Close20,
  Close24,
  Close32,
  Code16,
  Code20,
  Code24,
  Code32,
  Copy16,
  Copy20,
  Copy24,
  Copy32,
  Document16,
  Document20,
  Document24,
  Document32,
  Download16,
  Download20,
  Download24,
  Download32,
  DragVertical16,
  DragVertical20,
  DragVertical24,
  DragVertical32,
  Edit16,
  Edit20,
  Edit24,
  Edit32,
  Error16,
  Error20,
  Error24,
  Error32,
  Favorite16,
  Favorite20,
  Favorite24,
  Favorite32,
  FavoriteFilled16,
  FavoriteFilled20,
  FavoriteFilled24,
  FavoriteFilled32,
  Filter16,
  Filter20,
  Filter24,
  Filter32,
  Folder16,
  Folder20,
  Folder24,
  Folder32,
  Help16,
  Help20,
  Help24,
  Help32,
  Information16,
  Information20,
  Information24,
  Information32,
  Launch16,
  Launch20,
  Launch24,
  Launch32,
  Link16,
  Link20,
  Link24,
  Link32,
  Menu16,
  Menu20,
  Menu24,
  Menu32,
  OverflowMenuHorizontal16,
  OverflowMenuHorizontal20,
  OverflowMenuHorizontal24,
  OverflowMenuHorizontal32,
  Renew16,
  Renew20,
  Renew24,
  Renew32,
  Save16,
  Save20,
  Save24,
  Save32,
  Search16,
  Search20,
  Search24,
  Search32,
  Settings16,
  Settings20,
  Settings24,
  Settings32,
  SortAscending16,
  SortAscending20,
  SortAscending24,
  SortAscending32,
  Subtract16,
  Subtract20,
  Subtract24,
  Subtract32,
  Terminal16,
  Terminal20,
  Terminal24,
  Terminal32,
  TrashCan16,
  TrashCan20,
  TrashCan24,
  TrashCan32,
  Upload16,
  Upload20,
  Upload24,
  Upload32,
  User16,
  User20,
  User24,
  User32,
  View16,
  View20,
  View24,
  View32,
  ViewOff16,
  ViewOff20,
  ViewOff24,
  ViewOff32,
  Warning16,
  Warning20,
  Warning24,
  Warning32,
} from '@carbon/icons-vue';
import type { Component } from 'vue';
import { computed } from 'vue';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  spin?: boolean;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  spin: false,
});

const iconMap: Record<string, Record<number, Component>> = {
  Add: { 16: Add16, 20: Add20, 24: Add24, 32: Add32 },
  ArrowLeft: {
    16: ArrowLeft16,
    20: ArrowLeft20,
    24: ArrowLeft24,
    32: ArrowLeft32,
  },
  ArrowRight: {
    16: ArrowRight16,
    20: ArrowRight20,
    24: ArrowRight24,
    32: ArrowRight32,
  },
  Checkmark: {
    16: Checkmark16,
    20: Checkmark20,
    24: Checkmark24,
    32: Checkmark32,
  },
  CheckmarkFilled: {
    16: CheckmarkFilled16,
    20: CheckmarkFilled20,
    24: CheckmarkFilled24,
    32: CheckmarkFilled32,
  },
  ChevronDown: {
    16: ChevronDown16,
    20: ChevronDown20,
    24: ChevronDown24,
    32: ChevronDown32,
  },
  ChevronLeft: {
    16: ChevronLeft16,
    20: ChevronLeft20,
    24: ChevronLeft24,
    32: ChevronLeft32,
  },
  ChevronRight: {
    16: ChevronRight16,
    20: ChevronRight20,
    24: ChevronRight24,
    32: ChevronRight32,
  },
  ChevronUp: {
    16: ChevronUp16,
    20: ChevronUp20,
    24: ChevronUp24,
    32: ChevronUp32,
  },
  Close: { 16: Close16, 20: Close20, 24: Close24, 32: Close32 },
  Code: { 16: Code16, 20: Code20, 24: Code24, 32: Code32 },
  Copy: { 16: Copy16, 20: Copy20, 24: Copy24, 32: Copy32 },
  Document: { 16: Document16, 20: Document20, 24: Document24, 32: Document32 },
  Download: { 16: Download16, 20: Download20, 24: Download24, 32: Download32 },
  DragVertical: {
    16: DragVertical16,
    20: DragVertical20,
    24: DragVertical24,
    32: DragVertical32,
  },
  Edit: { 16: Edit16, 20: Edit20, 24: Edit24, 32: Edit32 },
  Error: { 16: Error16, 20: Error20, 24: Error24, 32: Error32 },
  Favorite: { 16: Favorite16, 20: Favorite20, 24: Favorite24, 32: Favorite32 },
  FavoriteFilled: {
    16: FavoriteFilled16,
    20: FavoriteFilled20,
    24: FavoriteFilled24,
    32: FavoriteFilled32,
  },
  Filter: { 16: Filter16, 20: Filter20, 24: Filter24, 32: Filter32 },
  Folder: { 16: Folder16, 20: Folder20, 24: Folder24, 32: Folder32 },
  Help: { 16: Help16, 20: Help20, 24: Help24, 32: Help32 },
  Information: {
    16: Information16,
    20: Information20,
    24: Information24,
    32: Information32,
  },
  Launch: { 16: Launch16, 20: Launch20, 24: Launch24, 32: Launch32 },
  Link: { 16: Link16, 20: Link20, 24: Link24, 32: Link32 },
  Menu: { 16: Menu16, 20: Menu20, 24: Menu24, 32: Menu32 },
  OverflowMenuHorizontal: {
    16: OverflowMenuHorizontal16,
    20: OverflowMenuHorizontal20,
    24: OverflowMenuHorizontal24,
    32: OverflowMenuHorizontal32,
  },
  Renew: { 16: Renew16, 20: Renew20, 24: Renew24, 32: Renew32 },
  Save: { 16: Save16, 20: Save20, 24: Save24, 32: Save32 },
  Search: { 16: Search16, 20: Search20, 24: Search24, 32: Search32 },
  Settings: { 16: Settings16, 20: Settings20, 24: Settings24, 32: Settings32 },
  SortAscending: {
    16: SortAscending16,
    20: SortAscending20,
    24: SortAscending24,
    32: SortAscending32,
  },
  Subtract: { 16: Subtract16, 20: Subtract20, 24: Subtract24, 32: Subtract32 },
  Terminal: { 16: Terminal16, 20: Terminal20, 24: Terminal24, 32: Terminal32 },
  TrashCan: { 16: TrashCan16, 20: TrashCan20, 24: TrashCan24, 32: TrashCan32 },
  Upload: { 16: Upload16, 20: Upload20, 24: Upload24, 32: Upload32 },
  User: { 16: User16, 20: User20, 24: User24, 32: User32 },
  View: { 16: View16, 20: View20, 24: View24, 32: View32 },
  ViewOff: { 16: ViewOff16, 20: ViewOff20, 24: ViewOff24, 32: ViewOff32 },
  Warning: { 16: Warning16, 20: Warning20, 24: Warning24, 32: Warning32 },
};

function getSizeKey() {
  if (typeof props.size === 'number') {
    if (props.size <= 16) return 16;
    if (props.size <= 20) return 20;
    if (props.size <= 24) return 24;
    return 32;
  }

  if (props.size === 'xs' || props.size === 'sm') return 16;
  if (props.size === 'lg') return 24;
  if (props.size === 'xl') return 32;
  return 20;
}

function getIconStyle() {
  const color = props.color || 'var(--color-icon)';
  return {
    color,
    filter: 'drop-shadow(0 0 1px var(--color-icon-glow))',
  };
}

const sizeKey = computed(getSizeKey);
const iconStyle = computed(getIconStyle);
const iconComponent = computed(
  () => iconMap[props.name]?.[sizeKey.value] ?? null,
);
</script>
