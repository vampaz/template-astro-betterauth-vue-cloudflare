import type { APIRoute } from 'astro';

export const GET: APIRoute = async function GET(context) {
  return new Response(
    JSON.stringify({
      session: context.locals.session || null,
      user: context.locals.user || null,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
