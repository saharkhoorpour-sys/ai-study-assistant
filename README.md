# 🎓 AI Study Assistant

A beginner-friendly web app where students can type questions, paste study notes, or ask for quizzes — and get instant, helpful answers from Claude AI.

---

## 📁 Folder Structure

```
ai-study-assistant/
├── server.js            ← Backend: Node.js + Express server
├── package.json         ← Project config and dependency list
├── .env.example         ← Template for your secret API key
├── .gitignore           ← Tells Git what NOT to upload
├── README.md            ← This file!
└── public/              ← Frontend files served to the browser
    ├── index.html       ← Main webpage
    ├── css/
    │   └── style.css    ← All visual styling
    └── js/
        └── script.js    ← Frontend logic (fetch, display, etc.)
```

---

## ✅ Prerequisites

Before you begin, make sure you have installed:

| Tool        | How to Check             | Download Link                        |
|-------------|--------------------------|--------------------------------------|
| **Node.js** | `node -v` in terminal    | https://nodejs.org (install LTS)     |
| **npm**     | `npm -v` in terminal     | Comes with Node.js automatically     |

You also need a **free Anthropic API key**:

1. Go to → https://console.anthropic.com
2. Sign in or create an account
3. Click **API Keys** in the left menu
4. Click **Create Key**, give it a name, and copy it

---

## 🚀 Installation & Setup (Step by Step)

### Step 1 — Download or clone the project

If you downloaded a ZIP, unzip it. Or if you have Git:

```bash
git clone <your-repo-url>
```

Then navigate into the project folder:

```bash
cd ai-study-assistant
```

---

### Step 2 — Install dependencies

This downloads all the packages listed in `package.json` into a `node_modules/` folder:

```bash
npm install
```

You should see output like `added 87 packages`. This is normal.

---

### Step 3 — Set up your API key

Copy the example environment file to create your own `.env`:

**On Mac/Linux:**
```bash
cp .env.example .env
```

**On Windows (Command Prompt):**
```cmd
copy .env.example .env
```

Now open the new `.env` file in any text editor and replace the placeholder with your real key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxx
```

Save the file. **Never share or commit this file.**

---

### Step 4 — Start the server

```bash
npm start
```

You should see:

```
======================================
🎓 AI Study Assistant is running!
🌐 Open in browser: http://localhost:3000
🔍 Health check:    http://localhost:3000/health
======================================
```

---

### Step 5 — Open the app in your browser

Visit: **http://localhost:3000**

You should see the AI Study Assistant homepage!

---

## 🧪 Testing the App

### Test 1 — Check the server is running

Open your browser and visit:
```
http://localhost:3000/health
```
You should see:
```json
{ "status": "ok", "message": "AI Study Assistant server is running!" }
```

### Test 2 — Test the AI route directly

You can use **curl** in your terminal (optional, for advanced testing):

```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is photosynthesis?"}'
```

You should get back a JSON response with an AI answer.

### Test 3 — Use the frontend

1. Open http://localhost:3000
2. Type: `Explain the water cycle in simple terms`
3. Click **Ask the AI Tutor**
4. Watch the loading dots appear, then the answer card slides in

---

## 💡 Example Usage

Here are some things you can type:

| What you type | What the AI does |
|---|---|
| `Explain Newton's laws of motion` | Clear explanation with examples |
| `Quiz me on World War 2` | Generates practice questions |
| `[Paste your class notes here]` | Summarizes and clarifies them |
| `What's the difference between DNA and RNA?` | Comparison breakdown |
| `I don't understand derivatives in calculus` | Step-by-step walkthrough |

---

## 🔄 Development Mode (Auto-restart)

While developing, use `nodemon` so the server restarts automatically when you save changes:

```bash
npm run dev
```

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 🐛 Troubleshooting

### ❌ "Cannot find module" error
Run `npm install` again. The `node_modules` folder might be missing.

### ❌ "API key is missing" error
Make sure your `.env` file exists (not just `.env.example`) and contains your real key with no extra spaces.

### ❌ "Could not reach the server" in the browser
Make sure you ran `npm start` and the terminal shows the server is running.

### ❌ Port 3000 is already in use
Either stop the other app using port 3000, or add `PORT=3001` to your `.env` file and restart.

### ❌ Blank page or CSS not loading
Make sure your files are inside the `public/` folder exactly as shown in the folder structure above.

---

## 🔐 Security Notes

- **Never commit your `.env` file.** It's listed in `.gitignore` to prevent this.
- The API key is only used on the backend — it's never sent to the browser.
- The frontend talks to your own server (`/api/ask`), not to Anthropic directly.

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `@anthropic-ai/sdk` | Official Claude AI client |
| `dotenv` | Loads `.env` variables into Node |
| `cors` | Allows cross-origin requests |
| `nodemon` (dev) | Auto-restarts server on file changes |

---

## 🎉 What the Finished App Does

1. User opens **http://localhost:3000** in a browser
2. They type a study question or paste notes into the text box
3. They click **Ask the AI Tutor**
4. The page shows a loading animation
5. The AI's answer appears in a styled card below
6. The user clicks **Ask another question** to start over

---

Built for curious minds. Happy studying! 📚
