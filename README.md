# Cloudflare Workers + React + Hono + Auth0 Project

## Prerequisites

- Node.js (v18+)
- npm
- Cloudflare account
- Auth0 account

## Setup Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd cloudflare-react-auth0-app
npm install
```

### 2. Auth0 Configuration

1. Create an Auth0 application
2. Configure Allowed Callback URLs, Logout URLs
3. Rename `.env.example` to `.env` and assign following values:

   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auto0=client-id
   VITE_AUTH0_AUDIENCE=your-auto0-audience
   ```

4. Rename the `wranger.example.toml` to `wrangler.toml` and assign the following values:

   ```
   [vars]
   AUTH0_DOMAIN = "your-auth0-domain"
   AUTH0_AUDIENCE = "your-audience-id"
   ```

5. Optionally remove the `wrangler.toml` from the `.gitignore` in `workers/`

### 3. Development

```bash
# Run both frontend and workers
npm run dev
```

### 4. Deployment

```bash
# Build project
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

## Key Technologies

- React
- Cloudflare Workers
- Hono
- Auth0
- TypeScript

## Features

- OIDC Authentication
- Protected API Routes
- Client-Side Rendering
