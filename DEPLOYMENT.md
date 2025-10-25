# 🚀 Deployment Guide - Omena Agency CRM

This guide covers deploying the CRM to production environments.

## 📦 Deployment Options

### Frontend Deployment (Vercel - Recommended)

[Vercel](https://vercel.com) is the best option for Next.js apps (made by Next.js creators).

#### Steps:

1. **Push code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Set root directory to `frontend`
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
   NEXT_PUBLIC_FIREBASE_APP_ID=xxx
   ```

#### Alternative: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `cd frontend && npm run build`
3. Deploy: `netlify deploy --prod`

### Backend Deployment

#### Option 1: Railway (Recommended - Easy)

[Railway](https://railway.app) offers easy deployment with MongoDB support.

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add MongoDB database
4. Add new service from GitHub repo
5. Set root directory to `backend`
6. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=<railway-mongodb-url>
   JWT_SECRET=<secure-random-string>
   FRONTEND_URL=<your-vercel-url>
   API_VERSION=v1
   ```
7. Deploy automatically on push

#### Option 2: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Create MongoDB on Render or use Atlas

#### Option 3: DigitalOcean App Platform

1. Create account at [digitalocean.com](https://digitalocean.com)
2. Create new App
3. Select GitHub repository
4. Configure app spec
5. Add managed MongoDB database
6. Deploy

#### Option 4: Traditional VPS (Advanced)

**For Ubuntu/Debian:**

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install mongodb

# Install PM2 for process management
sudo npm install -g pm2

# Clone repository
git clone <your-repo>
cd backend

# Install dependencies
npm install --production

# Create .env file
nano .env

# Start with PM2
pm2 start server.js --name omena-crm-api
pm2 save
pm2 startup
```

**Setup Nginx as reverse proxy:**

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Database Deployment

#### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create new cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (or 0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in backend environment

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/omena-crm?retryWrites=true&w=majority
```

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change all default credentials
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Configure CORS to only allow your frontend domain
- [ ] Set NODE_ENV=production
- [ ] Enable Firebase security rules
- [ ] Implement rate limiting
- [ ] Add API authentication/authorization
- [ ] Enable MongoDB authentication
- [ ] Regular security updates
- [ ] Setup error monitoring (Sentry, etc.)
- [ ] Configure backup strategy

## 🔧 Environment Variables Summary

### Frontend (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=
API_VERSION=v1
```

## 📊 Post-Deployment

### Monitor Your Application

1. **Backend Health Check**: `https://your-api.com/health`
2. **Frontend**: `https://your-app.com`
3. **MongoDB**: Check Atlas dashboard for connection stats

### Setup Monitoring (Optional)

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry, LogRocket
- **Analytics**: Google Analytics, Plausible
- **Performance**: Vercel Analytics, New Relic

### Backup Strategy

1. **MongoDB**: Enable automated backups in Atlas
2. **Code**: Keep Git repository updated
3. **Environment Variables**: Store securely (1Password, etc.)

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        # Railway auto-deploys on push
```

## 🌍 Custom Domain Setup

### Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate

### Backend (Railway/Render)
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS CNAME record
4. SSL is automatic

## 📈 Scaling Considerations

### When to Scale:

- **Frontend**: Vercel scales automatically
- **Backend**:
  - Use load balancer for multiple instances
  - Enable MongoDB sharding
  - Implement caching (Redis)
  - Use CDN for static assets

### Cost Optimization:

- Vercel: Free tier for small projects
- Railway: $5/month + usage
- MongoDB Atlas: Free tier (512MB)
- Total estimated: $5-20/month for small business

## 🆘 Troubleshooting

### Build Fails

- Check Node version (should be 18+)
- Verify all dependencies are in package.json
- Check for TypeScript errors
- Review build logs

### Database Connection Issues

- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured
- Test connection string locally first

### CORS Errors

- Update FRONTEND_URL in backend .env
- Check CORS configuration in server.js
- Verify domain is correct

---

**Deployment Time**: 30-60 minutes for first deployment

Good luck with your deployment! 🚀
