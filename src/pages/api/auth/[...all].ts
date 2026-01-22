import { createAuth } from '@/lib/auth';
import type { APIRoute } from 'astro';

export const ALL: APIRoute = async function ALL(context) {
  const env = context.locals.runtime?.env;

  if (!env) {
    return new Response(
      JSON.stringify({
        error: 'runtime-env-missing',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  const auth = createAuth(env);
  return auth.handler(context.request);
};
