# 🚀 Deploy AI Recipe Backend to Render

This guide will help you deploy the AI Recipe Improviser backend API to Render.

## Prerequisites

1. A [Render](https://render.com) account (free tier available)
2. Your code pushed to a GitHub repository
3. Git repository with the `recipe-backend` folder

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your backend code is in a Git repository:

```bash
cd recipe-backend
git init
git add .
git commit -m "Initial backend setup for Render deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository from the list

### 3. Configure the Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `ai-recipe-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `recipe-backend` (if backend is in a subfolder)
- **Runtime**: `Node`

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Environment Variables

In the **Environment** section, add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render default, leave empty to auto-assign) |
| `FRONTEND_URL` | `https://your-frontend-domain.com` |

**Note**: Render automatically provides the `PORT` environment variable, so you don't need to set it manually.

### 5. Advanced Settings (Optional)

- **Instance Type**: Free (or paid for better performance)
- **Auto-Deploy**: `Yes` (deploys automatically on git push)
- **Health Check Path**: `/api/health`

### 6. Deploy

1. Click **"Create Web Service"**
2. Render will automatically start building and deploying
3. Wait for the deployment to complete (usually 2-5 minutes)

### 7. Test Your Deployment

Once deployed, you'll get a URL like: `https://ai-recipe-backend.onrender.com`

Test these endpoints:

```bash
# Health check
curl https://your-app-name.onrender.com/api/health

# Root endpoint
curl https://your-app-name.onrender.com/

# Generate recipe
curl -X POST https://your-app-name.onrender.com/api/generate-recipe \
  -H "Content-Type: application/json" \
  -d '{"ingredients": ["chicken", "rice", "tomato"]}'
```

## Production Configuration

### Update CORS Origins

After deployment, update your CORS configuration in `server.js`:

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://your-actual-app-name.onrender.com']
    : ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:19006'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Environment Variables for Production

Set these in Render Dashboard → Your Service → Environment:

```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

## Render Service Features

### Free Tier Limitations
- Apps sleep after 15 minutes of inactivity
- 750 hours/month of runtime
- Slower cold starts (wake-up time)

### Paid Tier Benefits
- No sleeping
- Faster performance
- More memory and CPU
- Custom domains

## Monitoring & Logs

1. **View Logs**: Render Dashboard → Your Service → Logs
2. **Metrics**: Render Dashboard → Your Service → Metrics
3. **Health Checks**: Automatic via `/api/health` endpoint

## Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js version in `package.json` engines
   - Verify all dependencies are in `package.json`

2. **App Won't Start**:
   - Check start script in `package.json`
   - Verify PORT environment variable usage

3. **CORS Errors**:
   - Update CORS origins for production
   - Add your frontend domain to allowed origins

### Debug Commands:

```bash
# Check logs
render logs --service-name your-service-name

# Shell access (paid tiers)
render shell --service-name your-service-name
```

## Updating Your App

1. Push changes to your Git repository:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. Render will automatically rebuild and deploy (if auto-deploy is enabled)

## API Documentation

Your deployed API will be available at:
- **Base URL**: `https://your-app-name.onrender.com`
- **Health Check**: `GET /api/health`
- **API Docs**: `GET /` (root endpoint with API info)

## Next Steps

1. Deploy your frontend to Netlify, Vercel, or Render
2. Update frontend API endpoints to use your Render URL
3. Set up custom domain (paid tier)
4. Add database integration (MongoDB Atlas, etc.)

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- [GitHub Issues](https://github.com/your-username/your-repo/issues)

---

🎉 **Congratulations!** Your AI Recipe backend is now live on Render!