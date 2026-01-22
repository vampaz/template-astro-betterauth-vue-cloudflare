<template>
  <div data-testid="user-menu-root" class="flex items-center">
    <a
      v-if="!props.user"
      data-testid="user-menu-login"
      href="/login"
      class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-fg4)] transition-all duration-150 hover:text-[var(--color-fg0)] hover:bg-[var(--color-bg1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-bg2)]"
    >
      <Icon name="User" size="sm" />
      Log in
    </a>
    <Dropdown v-else position="bottom-end">
      <template #trigger>
        <button
          type="button"
          data-testid="user-menu-trigger"
          class="inline-flex items-center gap-2 rounded-md py-2 pl-3 pr-0 text-sm font-medium text-[var(--color-fg4)] transition-all duration-150 hover:text-[var(--color-fg0)] hover:bg-[var(--color-bg1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-bg2)]"
          aria-label="User menu"
        >
          <img
            v-if="props.user?.image"
            data-testid="user-menu-avatar"
            :src="props.user.image"
            :alt="
              props.user?.name ? `${props.user.name} avatar` : 'User avatar'
            "
            class="h-6 w-6 rounded-full object-cover"
          />
          <Icon v-else name="User" size="sm" />
          <span class="max-w-[140px] truncate">
            {{ userLabel }}
          </span>
          <Icon name="ChevronDown" size="sm" />
        </button>
      </template>
      <DropdownItem icon="Launch" @click="goToDashboard"
        >Dashboard</DropdownItem
      >
      <DropdownItem icon="ArrowLeft" danger @click="signOut"
        >Log out</DropdownItem
      >
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Dropdown, DropdownItem, Icon } from '@/components/ui';
import { authClient } from '@/lib/auth-client';

interface UserMenuProps {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  } | null;
}

const props = withDefaults(defineProps<UserMenuProps>(), {
  user: null,
});

const userLabel = computed(() => props.user?.name?.trim() || 'Account');

function goToDashboard() {
  window.location.href = '/dashboard';
}

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = '/';
      },
    },
  });
}
</script>
