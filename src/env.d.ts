/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database;

type Env = {
  DATABASE: D1Database;
  R2_BUCKET: R2Bucket;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  PUBLIC_BETTER_AUTH_URL: string;
};

declare namespace App {
  interface Locals {
    runtime: {
      env: Env;
    };
    user?: import('better-auth').User;
    session?: import('better-auth').Session;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_BETTER_AUTH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
