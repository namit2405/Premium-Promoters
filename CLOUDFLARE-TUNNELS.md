# Cloudflare Tunnel URLs

## Active Tunnels

### Frontend (Port 5173)
**URL:** https://currently-prepare-shannon-massage.trycloudflare.com

This is your main website that visitors will see.

### Backend (Port 5000)
**URL:** https://love-apnic-housewares-plaintiff.trycloudflare.com

This serves your API and admin portal.

## Admin Panel Access

**Admin Portal URL:** https://love-apnic-housewares-plaintiff.trycloudflare.com/admin-portal.html

**Login Credentials:**
- Email: admin@premiumpromoters.com
- Password: admin123

## Important Notes

1. **Cloudflare tunnels are temporary** - They will stop when you close the terminal windows
2. **URLs change each time** - When you restart the tunnels, you'll get new URLs
3. **Both servers must be running:**
   - Frontend dev server on port 5173
   - Backend server on port 5000
   - MongoDB must be connected

## To Stop Tunnels

Close both Cloudflare tunnel terminal windows or press Ctrl+C in each window.

## To Restart Tunnels

Run these commands in separate terminals:
```bash
cloudflared tunnel --url http://localhost:5173
cloudflared tunnel --url http://localhost:5000
```

Then update the URLs in:
- `src/frontend/src/api-config.ts`
- `backend/admin-portal.html`
- `backend/server.js` (CORS settings)
- `src/frontend/vite.config.js` (allowedHosts)
