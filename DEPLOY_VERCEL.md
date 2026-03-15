# Nourish Next deployment on Vercel

Deploy this repo as separate Vercel projects. For the work completed here, the important ones are:

1. `backend`
2. `user`

## Backend

Create a Vercel project with:

- Root Directory: `backend`
- Framework Preset: `Other`
- Install Command: `npm install`
- Build Command: leave empty
- Output Directory: leave empty

Set these environment variables:

- `MONGO_URI`
- `FRONTEND_URLS`
- `ALLOW_VERCEL_PREVIEWS`

Example:

```text
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nourish-next
FRONTEND_URLS=https://your-user-app.vercel.app
ALLOW_VERCEL_PREVIEWS=true
```

## User app

Create a Vercel project with:

- Root Directory: `user`
- Framework Preset: `Vite`

Set these environment variables:

- `VITE_API_BASE_URL`
- `VITE_API_ADMIN`
- `VITE_API_DELIVERY`

Example:

```text
VITE_API_BASE_URL=https://your-backend-app.vercel.app
VITE_API_ADMIN=https://your-admin-app.vercel.app
VITE_API_DELIVERY=https://your-delivery-app.vercel.app
```

## Local run order

1. Start MongoDB locally or use MongoDB Atlas.
2. In `backend`, run `npm install` and `npm run dev`.
3. In `user`, run `npm install` and `npm run dev`.
4. Open the Vite URL, usually `http://localhost:5173`.
