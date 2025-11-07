# Deployment Guide

## Pushing to GitHub

### Step 1: Initialize Git (if not already initialized)

```bash
cd portfolio
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Commit Changes

```bash
git commit -m "Initial commit: Portfolio website"
```

### Step 4: Add Remote Repository

```bash
git remote add origin https://github.com/Dinesh2112/Portfolio.git
```

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `portfolio`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

## Environment Variables

If you need to add environment variables:
1. Create a `.env.local` file (this is already in .gitignore)
2. Add your variables
3. In Vercel, go to Project Settings > Environment Variables
4. Add the same variables there

## Custom Domain

1. Go to Vercel Project Settings
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

