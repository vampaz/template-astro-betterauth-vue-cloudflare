import { createAuthClient } from 'better-auth/vue';

const baseURL =
  typeof window === 'undefined'
    ? import.meta.env.PUBLIC_BETTER_AUTH_URL
    : import.meta.env.PUBLIC_BETTER_AUTH_URL || window.location.origin;

export const authClient = createAuthClient({
  baseURL,
});
