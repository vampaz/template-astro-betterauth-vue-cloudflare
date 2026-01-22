# Template Astro Vue Cloudflare

A robust starter template for building high-performance applications with [Astro](https://astro.build), [Vue 3](https://vuejs.org), and [Cloudflare Workers](https://workers.cloudflare.com). It comes pre-configured with authentication, a database ORM, and styling.

## Features

- **⚡ Astro 5**: The web framework for content-driven websites.
- **🔥 Vue 3**: Progressive JavaScript framework for building user interfaces.
- **☁️ Cloudflare Workers**: Deploy server-side logic to the edge.
- **🔒 Better Auth**: Comprehensive authentication (GitHub provider configured by default).
- **🗄️ Drizzle ORM**: Lightweight and type-safe SQL ORM for SQLite (Cloudflare D1).
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **✅ Testing**: Unit testing setup with [Vitest](https://vitest.dev).
- **📏 Linting & Formatting**: Pre-configured with [ESLint](https://eslint.org) and [Prettier](https://prettier.io).

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [Cloudflare Account](https://dash.cloudflare.com/sign-up) (for D1 and Workers)

## Getting Started

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/vampaz/template-astro-betterauth-vue-cloudflare.git
    cd template-astro-betterauth-vue-cloudflare
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Environment Setup:**
    - Create a `.dev.vars` file in the root directory for your local secrets:
      ```ini
      GITHUB_CLIENT_ID="your_github_client_id"
      GITHUB_CLIENT_SECRET="your_github_client_secret"
      BETTER_AUTH_SECRET="your_generated_secret"
      BETTER_AUTH_URL="http://localhost:4321"
      CLOUDFLARE_ACCOUNT_ID="your_account_id"
      CLOUDFLARE_DATABASE_ID="your_database_id"
      CLOUDFLARE_D1_TOKEN="your_api_token"
      ```

4.  **Database Setup:**
    - Create a D1 database in your Cloudflare dashboard.
    - Update `wrangler.toml` with your `database_id`.
    - Generate migrations:
      ```sh
      npm run db:generate
      ```
    - Apply migrations locally:
      ```sh
      npm run db:migrate -- --local
      ```

5.  **Run Development Server:**
    ```sh
    npm run dev
    ```
    Your app should now be running at `http://localhost:4321`.

## Scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Starts the local development server          |
| `npm run build`       | Builds the project for production            |
| `npm run preview`     | Previews the production build locally        |
| `npm run test`        | Runs unit tests with Vitest                  |
| `npm run lint`        | Runs ESLint to check for code issues         |
| `npm run format`      | Formats code with Prettier                   |
| `npm run db:generate` | Generates SQL migrations from Drizzle schema |
| `npm run db:migrate`  | Applies migrations to the D1 database        |

## Deployment

This template is configured for Cloudflare Pages or Workers.

1.  **Build the project:**

    ```sh
    npm run build
    ```

2.  **Deploy using Wrangler:**
    ```sh
    npx wrangler deploy
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
