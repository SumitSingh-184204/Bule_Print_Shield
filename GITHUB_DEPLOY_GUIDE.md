# Full-Stack Deployment Guide: GitHub Pages & API Server Hosting

Because this application uses a robust full-stack architecture comprising a **React + Vite Frontend Client** and an **Express API Server** (managing CISA vulnerability correlation feeds and secure Gemini AI consultations), the deployment is split into two halves:

1. **Frontend Client (Static Website)**: Hosted on **GitHub Pages** (Completely Free, Fast, global SSL CDN).
2. **Backend Server (Dynamic Containers)**: Hosted on a container platform like **Google Cloud Run**, **Render**, **Fly.io**, **Heroku**, or **AWS App Runner** (Runs Node.js, hosts API endpoints, and secures API keys safely).

---

## 🛠️ Step 1: Deploying the Backend API Server

Since **GitHub Pages ONLY holds static web files (HTML, CSS, JS)**, your Node.js `server.ts` file cannot run directly on GitHub Pages. You must deploy it to a cloud runtime environment.

### Option A: Hosting with Google Cloud Run (Recommended)
This is the same infrastructure running the sandbox container right now.
1. Install the [Google Cloud SDK](https://cloud.google.com/sdk).
2. Run this command inside your project root to build and deploy your Express container:
   ```bash
   gcloud run deploy threat-scout-backend --source . --port 3000 --allow-unauthenticated
   ```
3. Set your secure Backend Environment Variables on your Cloud Run service console:
   - `GEMINI_API_KEY` (For the Threat Assessment Consultation helper)
   - `OTX_API_KEY` (Optional, AlienVault integrations)
   - `VIRUSTOTAL_API_KEY` (Optional, VirusTotal reputation scores)
4. Record the secure HTTPS Service URL generated (e.g. `https://threat-scout-backend-xxxxxxxxxx.run.app`).

### Option B: Hosting with Render (Free Node Tier)
1. Commit and push your code to your GitHub repository.
2. Log in to [Render (render.com)](https://render.com) and click **New > Web Service**.
3. Link your GitHub repository.
4. Set the following build options in the Render Dashboard:
   - **Environment**: `Node` or `Docker`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start` (Starts `node dist/server.cjs`)
5. Navigate to **Environment Secrets** and configure your keys (`GEMINI_API_KEY` etc).
6. Save and secure your unique backend URL.

---

## 🔒 Step 2: Configuring Server security (CORS)

When your frontend site runs on `https://<your-username>.github.io` and queries your backend API (`https://<your-backend-url>`), browsers will trigger a **CORS (Cross-Origin Resource Sharing)** intercept unless allowed.

We have pre-configured Express server logic to allow dynamic requests, but you can hardcode your final URL in `server.ts` once deployed to reinforce defenses:
```typescript
// Insert in server.ts middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://<your-github-username>.github.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
  next();
});
```

---

## 🚀 Step 3: Deploying the React Client to GitHub Pages

We have added a custom **GitHub Actions CI/CD Workflow** to automate this build sequence at `.github/workflows/deploy.yml`.

### Instructions:
1. Create a **New Repository** on your GitHub account.
2. Link your local project directory and push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: configure full-stack deploy configurations"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Open your project on GitHub and go to **Settings** > **Pages** > **Build and Deployment**:
   - Under **Source**, select **GitHub Actions** (instead of Deploy from branch).
4. Configure your repository secrets under **Settings** > **Secrets and variables** > **Actions**:
   - Add a repository variable named `VITE_API_BASE_URL` with your exact backend URL (e.g., `https://threat-scout-backend-xxxxxxxxxx.run.app`).
5. Go to the **Actions** tab on GitHub. You will watch your workflow build dependencies and host your static app.
6. Once deployed, enjoy your application securely at:
   `https://<your-username>.github.io/<your-repo-name>/`
