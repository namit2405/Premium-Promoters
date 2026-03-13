# Custom Domain Setup - premium-promoters.com

## Overview
You'll point your domain to Vercel for the frontend. Optionally, you can use a subdomain for the backend API.

## Recommended Setup
- `premium-promoters.com` → Vercel (Frontend)
- `www.premium-promoters.com` → Vercel (Frontend)
- `api.premium-promoters.com` → Render (Backend) - Optional

---

## Part 1: Connect Domain to Vercel (Frontend)

### Step 1: Add Domain in Vercel
1. Go to your Vercel project dashboard
2. Click on "Settings" → "Domains"
3. Add these domains:
   - `premium-promoters.com`
   - `www.premium-promoters.com`
4. Vercel will show you DNS records to add

### Step 2: Configure DNS in Hostinger
1. Log in to Hostinger
2. Go to "Domains" → Select `premium-promoters.com`
3. Click "DNS / Nameservers"
4. Add these records (Vercel will provide exact values):

**For apex domain (premium-promoters.com):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Wait for DNS Propagation
- DNS changes take 5 minutes to 48 hours
- Usually works within 30 minutes
- Check status in Vercel dashboard

---

## Part 2: Connect Backend API (Optional)

### Option A: Use Subdomain (Recommended)

#### Step 1: Add Custom Domain in Render
1. Go to Render dashboard → Your backend service
2. Click "Settings" → "Custom Domain"
3. Add: `api.premium-promoters.com`
4. Render will show you a CNAME target

#### Step 2: Add DNS Record in Hostinger
```
Type: CNAME
Name: api
Value: premium-promoters-backend.onrender.com
TTL: 3600
```

#### Step 3: Update Frontend Config
Update `config.json`:
```json
{
  "production": {
    "backend": {
      "url": "https://api.premium-promoters.com",
      "apiUrl": "https://api.premium-promoters.com/api"
    }
  }
}
```

Then run:
```bash
npm run update-config
git add .
git commit -m "Update backend URL to custom domain"
git push
```

### Option B: Keep Render Default URL
Just use `https://premium-promoters-backend.onrender.com` - works fine!

---

## Part 3: Update CORS Settings

Once your domain is live, update backend CORS:

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://premium-promoters.com',
    'https://www.premium-promoters.com',
    'https://api.premium-promoters.com',
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ],
  credentials: true
}));
```

Commit and push to update.

---

## Verification Steps

### 1. Check DNS Propagation
Visit: https://dnschecker.org
Enter: `premium-promoters.com`

### 2. Test Frontend
- Visit: https://premium-promoters.com
- Should load your website

### 3. Test Backend (if using custom domain)
- Visit: https://api.premium-promoters.com/api/health
- Should return: `{"status":"ok"}`

### 4. Test Admin Portal
- Visit: https://api.premium-promoters.com/admin-portal.html
- Or: https://premium-promoters-backend.onrender.com/admin-portal.html

---

## SSL Certificates

Both Vercel and Render automatically provide free SSL certificates:
- ✅ Vercel: Auto SSL for all domains
- ✅ Render: Auto SSL for custom domains
- No configuration needed!

---

## Troubleshooting

### Domain not working after 24 hours
1. Check DNS records in Hostinger match exactly
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private mode
4. Check Vercel dashboard for domain status

### SSL Certificate Error
- Wait 10-15 minutes after DNS propagation
- Vercel/Render auto-generate certificates
- Check domain status in respective dashboards

### API not connecting
1. Verify CORS settings include your domain
2. Check backend is deployed and running
3. Test API endpoint directly in browser

---

## Quick DNS Reference

**Hostinger DNS Management:**
1. Login → Domains → premium-promoters.com
2. DNS / Nameservers → Manage DNS Records
3. Add/Edit records as shown above
4. Save changes

**Common Record Types:**
- **A Record**: Points domain to IP address
- **CNAME**: Points domain to another domain
- **TXT**: Used for verification

---

## Cost Summary

- ✅ Domain: ~$10-15/year (Hostinger)
- ✅ Hosting: FREE (Vercel + Render)
- ✅ SSL: FREE (Auto-generated)
- ✅ CDN: FREE (Vercel)
- ✅ Database: FREE (MongoDB Atlas)
- ✅ Image Storage: FREE (Cloudinary)

**Total: Just domain cost!**

---

## Next Steps After Setup

1. Update social media links with new domain
2. Set up Google Analytics (optional)
3. Submit sitemap to Google Search Console
4. Set up email forwarding in Hostinger (optional)
5. Create professional email: contact@premium-promoters.com

---

## Support

- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- Render Docs: https://render.com/docs/custom-domains
- Hostinger Support: https://www.hostinger.com/tutorials/
