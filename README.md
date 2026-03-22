# ShadowIntel V2 - Advanced AI Threat Intelligence

A production-ready security platform consisting of a localized AI core and a responsive web dashboard for dark web monitoring.

## 🏗️ Architecture (Monorepo)

- **`/backend`**: Node.js/Express server with a custom Naive Bayes Classifier and Tor2Web Crawler.
- **`/web-dashboard`**: React/Vite frontend using Vanilla CSS for a minimalist, high-performance UI.
- **`/mobile-verify`**: Mobile-first endpoint scanner (PWA).

## 🚀 Local Deployment

1. **Start the Engine:**
   ```bash
   cd backend && npm install && node server.js
   ```
2. **Start the Dashboard:**
   ```bash
   cd web-dashboard && npm install && npm run dev
   ```

## 🌐 Vercel Deployment

This project is configured for Vercel Monorepos. To deploy the dashboard:
1. Import the repository.
2. Set **Root Directory** to `web-dashboard`.
3. Vercel will automatically detect Vite and build the `dist` folder.
4. Set the **VITE_API_URL** environment variable to your public backend endpoint.

---
**Disclaimer:** This tool is for educational and cybersecurity defense purposes only. Always comply with local laws and ethical hacking standards.
