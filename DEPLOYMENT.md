# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)
- MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)

## Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox - 512MB)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Choose Password authentication
   - Save username and password
4. Whitelist all IPs:
   - Go to Network Access
   - Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/premium-promoters?retryWrites=true&w=majority`

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: premium-promoters-backend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random string (e.g., use: `openssl rand -base64 32`)
   - `PORT`: 5000
   - `NODE_ENV`: production
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://premium-promoters-backend.onrender.com`)

## Step 4: Update Frontend Config

1. Open `config.json`
2. Update the production backend URL:
```json
{
  "production": {
    "backend": {
      "url": "https://your-backend-url.onrender.com",
      "apiUrl": "https://your-backend-url.onrender.com/api"
    }
  }
}
```

3. Run the update script:
```bash
npm run update-config
```

4. Commit and push changes:
```bash
git add .
git commit -m "Update production config"
git push
```

## Step 5: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `src/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. Your site will be live at `https://your-project.vercel.app`

## Step 6: Seed Database (Optional)

If you want to populate your database with initial data:

1. Update `backend/seed-data.js` with your production MongoDB URI
2. Run locally:
```bash
cd backend
node seed-data.js
```

Or SSH into Render and run it there.

## Step 7: Update CORS Settings

Make sure your backend allows requests from your Vercel domain:

1. In `backend/server.js`, update CORS origin:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

2. Commit and push - Render will auto-deploy.

## Admin Portal Access

Your admin portal will be available at:
`https://your-backend-url.onrender.com/admin-portal.html`

Default credentials:
- Email: admin@premiumpromoters.com
- Password: admin123

**⚠️ IMPORTANT: Change these credentials after first login!**

## Troubleshooting

### Backend Issues
- Check Render logs in dashboard
- Verify environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Frontend Issues
- Check Vercel deployment logs
- Verify API_BASE_URL in config.json points to correct backend
- Check browser console for CORS errors

### Database Connection Issues
- Verify MongoDB connection string format
- Check database user permissions
- Ensure network access is configured correctly

## Monitoring

- **Render**: Free tier sleeps after 15 min inactivity (cold start ~30s)
- **Vercel**: Always active, instant response
- **MongoDB Atlas**: Monitor usage in Atlas dashboard

## Custom Domain (Optional)

### Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render (Backend)
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

## Cost Optimization

All services are free with these limits:
- **Vercel**: Unlimited bandwidth, 100GB/month
- **Render**: 750 hours/month (enough for 1 service)
- **MongoDB Atlas**: 512MB storage, shared cluster

## Next Steps

1. Set up monitoring (Render has built-in metrics)
2. Configure custom domains
3. Set up CI/CD for automatic deployments
4. Add error tracking (Sentry, LogRocket)
5. Set up backups for MongoDB

## Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
