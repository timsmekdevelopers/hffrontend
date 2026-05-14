# Node.js + React App

This project contains:
- `client/` - React frontend (deploy to Vercel)
- `server/` - Express backend (deploy to Render)

## Local Development

### Backend
1. Go to `server/`.
2. Copy `.env.example` to `.env` and set values.
3. Install and run:
	- `npm install`
	- `npm run dev` (or `npm start`)

### Frontend
1. Go to `client/`.
2. Copy `.env.example` to `.env`.
3. For local development, you can keep `REACT_APP_API_BASE_URL` empty so CRA proxy handles `/api` calls.
4. Install and run:
	- `npm install`
	- `npm start`

## Split Into Two Git Repositories

Yes, you can (and should) keep frontend and backend in different repos for Vercel + Render.

### 1) Create backend repo from `server/`

From the parent folder of this project:

```powershell
mkdir hf-backend
Copy-Item -Recurse -Force .\hf\server\* .\hf-backend\
Copy-Item .\hf\server\.env.example .\hf-backend\
Set-Location .\hf-backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin <your-backend-github-repo-url>
git push -u origin main
```

### 2) Create frontend repo from `client/`

From the same parent folder:

```powershell
mkdir hf-frontend
Copy-Item -Recurse -Force .\hf\client\* .\hf-frontend\
Copy-Item .\hf\client\.env.example .\hf-frontend\
Set-Location .\hf-frontend
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin <your-frontend-github-repo-url>
git push -u origin main
```

## Render (Backend)

1. Create a new Render Web Service from your backend GitHub repo.
2. Root directory: repository root (backend repo).
3. Build command: `npm install`
4. Start command: `npm start`
5. Set environment variables:
	- `MONGODB_URI`
	- `FRONTEND_ORIGIN=https://your-frontend.vercel.app`
	- `PORT` (optional on Render)

## Vercel (Frontend)

1. Import your frontend GitHub repo into Vercel.
2. Framework preset: Create React App.
3. Set environment variable:
	- `REACT_APP_API_BASE_URL=https://your-backend.onrender.com`
4. Redeploy after saving env vars.

## Notes

- Backend now exposes API only; it no longer serves `client/build`.
- Frontend keeps existing relative `/api/...` code and maps it to `REACT_APP_API_BASE_URL` in hosted environments.
