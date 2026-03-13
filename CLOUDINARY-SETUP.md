# Cloudinary Setup for Image Uploads

## Why Cloudinary?
Render's free tier has ephemeral storage - uploaded files are deleted on restart/redeploy. Cloudinary provides free permanent cloud storage for images.

## Setup Steps

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email

### 2. Get Your Credentials
1. Go to your Cloudinary Dashboard
2. You'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Add to Render Environment Variables
1. Go to your Render service dashboard
2. Navigate to Environment tab
3. Add these three variables:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

### 4. Redeploy
Render will automatically redeploy with the new environment variables.

## How It Works
- Images are uploaded directly to Cloudinary
- Cloudinary returns a permanent URL
- This URL is stored in MongoDB
- Images are served from Cloudinary's CDN (fast worldwide)

## Free Tier Limits
- 25 GB storage
- 25 GB bandwidth per month
- 25 credits per month
- More than enough for most small businesses

## Benefits
- ✅ Permanent storage (survives server restarts)
- ✅ Fast CDN delivery
- ✅ Automatic image optimization
- ✅ Free SSL
- ✅ Image transformations available
