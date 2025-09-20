# AI Receipt App

A React-based AI receipt processing application with Claude AI integration.

## Project Structure

This is a React app built with Vite, located in the **root directory** of the repository.

## Build Commands

- **Install**: `npm ci`
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Preview**: `npm run preview`

## Deployment

### Render
The app is configured for Render deployment with `render.yaml`.

**Important**: The app is in the root directory, not in a subdirectory.

- Root Directory: `.` (repository root)
- Build Command: `npm ci && npm run build`
- Publish Directory: `./dist`

### Features

- ✅ Responsive mobile-first design
- ✅ Claude AI chat integration
- ✅ Real-time messaging
- ✅ Loading states and error handling
- ✅ Touch-friendly interface

## Environment

No environment variables needed - API key is embedded for production deployment.