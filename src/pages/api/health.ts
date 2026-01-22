import type { APIRoute } from 'astro';

export const GET: APIRoute = async function GET(context) {
  const env = context.locals.runtime?.env;

  if (!env) {
    return new Response(
      JSON.stringify({
        status: 'error',
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

  const dbStatus = env.DATABASE ? 'connected' : 'missing';
  const r2Status = env.R2_BUCKET ? 'connected' : 'missing';

  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        r2: r2Status,
      },
      version: '0.0.1',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
