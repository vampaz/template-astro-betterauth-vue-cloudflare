<script setup lang="ts">
import { ref } from 'vue';
import { authClient } from '@/lib/auth-client';

const loading = ref(false);
const error = ref('');

async function signIn() {
  loading.value = true;
  error.value = '';
  try {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    });
  } catch (errorValue) {
    if (errorValue instanceof Error) {
      error.value = errorValue.message;
    } else {
      error.value = 'Failed to sign in';
    }
    loading.value = false;
  }
}
</script>

<template>
  <div
    data-testid="login-view-root"
    class="flex flex-col items-center gap-4 p-8 rounded-lg"
    style="background-color: var(--color-bg1); border-color: var(--color-bg2)"
  >
    <h2>Welcome</h2>
    <p>Sign in to access your dashboard.</p>

    <button
      data-testid="login-view-signin"
      @click="signIn"
      :disabled="loading"
      class="border-none py-3 px-6 rounded cursor-pointer text-base font-bold transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      style="background-color: var(--color-bg2); color: var(--color-fg0)"
      onmouseover="this.style.backgroundColor = 'var(--color-bg3)'"
      onmouseout="this.style.backgroundColor = 'var(--color-bg2)'"
    >
      {{ loading ? 'Signing in...' : 'Sign in with GitHub' }}
    </button>

    <p
      v-if="error"
      data-testid="login-view-error"
      class="text-sm"
      style="color: var(--color-red)"
    >
      {{ error }}
    </p>
  </div>
</template>
