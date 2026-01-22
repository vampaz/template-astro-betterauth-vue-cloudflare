# Template Astro Vue Cloudflare

A template for building applications with Astro, Vue, and Cloudflare Workers, featuring built-in Authentication (Better Auth) and Drizzle ORM.

## Features

- **Astro**: High-performance static and server-rendered apps.
- **Vue 3**: Component framework for interactive UI.
- **Cloudflare Workers**: Serverless execution on the edge.
- **Better Auth**: Authentication solution (GitHub provider configured by default).
- **Drizzle ORM**: Type-safe database access with SQLite (Cloudflare D1).
- **Tailwind CSS**: Utility-first CSS framework.

## Getting Started

1.  **Install dependencies:**
    ```sh
    npm install
    ```

2.  **Configure Environment:**
    - Copy `.dev.vars.example` to `.dev.vars` (if available) or create it with your secrets.
    - Set up your Cloudflare D1 database and update `wrangler.toml` with the `database_id`.

3.  **Run Migrations:**
    - Generate migrations: `npm run db:generate`
    - Apply migrations (local): `npm run db:migrate -- --local`

4.  **Run Development Server:**
    ```sh
    npm run dev
    ```

## Project Structure

- `src/pages/`: File-based routing.
    - `index.astro`: Public landing page.
    - `dashboard/`: Protected private routes.
    - `api/`: API endpoints.
- `src/db/`: Database schema and client.
- `src/lib/auth.ts`: Authentication configuration.
- `src/components/`: Vue and Astro components.
