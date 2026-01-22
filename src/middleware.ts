import { defineMiddleware } from 'astro/middleware';
import { createAuth } from '@/lib/auth';

export const onRequest = defineMiddleware(
  async function onRequest(context, next) {
    const isDashboard = context.url.pathname.startsWith('/dashboard');
    const isApi =
      context.url.pathname.startsWith('/api') &&
      !context.url.pathname.startsWith('/api/auth') &&
      !context.url.pathname.startsWith('/api/health');

    if (!context.locals.runtime?.env) {
      if (isDashboard || isApi) {
        console.error('Runtime environment missing');
        return new Response('Internal Server Error', { status: 500 });
      }
      return next();
    }

    const auth = createAuth(context.locals.runtime.env);
    const session = await auth.api.getSession({
      headers: context.request.headers,
    });

    if (session) {
      context.locals.user = session.user;
      context.locals.session = session.session;
    }

    if ((isDashboard || isApi) && !session) {
      if (isApi) {
        return new Response('Unauthorized', { status: 401 });
      }
      return context.redirect('/login');
    }

    return next();
  },
);
