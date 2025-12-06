# Deployment Guide - Render.com

This guide will help you deploy your Codenames game to Render for free.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com))
3. Your code pushed to a GitHub repository

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Step 2: Deploy to Render

### Option A: Using the Blueprint (Recommended - Easiest!)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click **"Apply"**
6. Wait for both services to deploy (this may take 5-10 minutes)

### Option B: Manual Deployment

If the blueprint doesn't work, deploy manually:

#### Deploy Backend:

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `codenames-server` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. Click **"Advanced"** and add environment variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - Leave `CLIENT_URL` empty for now (we'll add it after frontend deploys)

5. Click **"Create Web Service"**
6. **Copy your backend URL** (it will look like: `https://codenames-server-xxxx.onrender.com`)

#### Deploy Frontend:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `codenames-client` (or your choice)
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Click **"Advanced"** and add environment variable:
   - `VITE_SERVER_URL` = `YOUR_BACKEND_URL` (paste the URL you copied above)

5. Click **"Create Static Site"**
6. **Copy your frontend URL** (it will look like: `https://codenames-client-xxxx.onrender.com`)

## Step 3: Configure CORS

Now that both are deployed, update the backend's environment variables:

1. Go to your **backend service** in Render
2. Click **"Environment"** in the left sidebar
3. Add/Update the environment variable:
   - `CLIENT_URL` = `YOUR_FRONTEND_URL` (paste the frontend URL you copied)
4. Click **"Save Changes"**
5. The backend will automatically redeploy

## Step 4: Test Your Deployment

1. Open your frontend URL in a browser
2. Click **"Create New Game"**
3. You should get a 4-character room code
4. Open the same URL on another device/browser
5. Enter the room code and join
6. Test that cards reveal in real-time on both devices

## Important Notes

### Free Tier Limitations

- **Backend**: Spins down after 15 minutes of inactivity
  - First request after sleeping will take ~30 seconds (cold start)
  - Subsequent requests will be fast

- **Frontend**: Always available, no cold starts

- **Monthly limit**: 750 hours per service (more than enough for personal use)

### Custom Domain (Optional)

You can add a custom domain in Render:
1. Go to your service → **"Settings"** → **"Custom Domain"**
2. Follow Render's instructions to configure DNS

## Troubleshooting

### "Cannot connect to server"

1. Check that backend service is running (green status in Render)
2. Verify `VITE_SERVER_URL` in frontend matches your backend URL exactly
3. Check that `CLIENT_URL` in backend matches your frontend URL exactly
4. Make sure both URLs use `https://` (Render provides free SSL)

### "Room not found" errors

- This is normal if the backend restarted (rooms are in-memory)
- Players need to create a new room after backend restarts

### Backend keeps sleeping

- This is expected on the free tier
- First user of the day will experience a ~30 second wait
- Consider upgrading to paid tier if you need 24/7 availability

## Environment Variables Reference

### Backend (`server`)
- `PORT` - Port to run on (Render sets this automatically)
- `NODE_ENV` - Set to `production`
- `CLIENT_URL` - Your frontend URL for CORS

### Frontend (`client`)
- `VITE_SERVER_URL` - Your backend URL

## Updating Your Deployment

To deploy updates:

1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Render will automatically detect the changes and redeploy

You can disable auto-deploy in Render settings if you prefer manual deploys.

## Cost

- **Free tier**: $0/month
  - Perfect for personal use and demos
  - Backend sleeps after 15 min inactivity

- **Starter tier**: $7/month per service ($14 total)
  - No sleeping
  - Always available
  - Better performance

---

That's it! Your Codenames game is now live and accessible from anywhere. Share the URL with friends and start playing!
