// ============================================================
// server.js — The backend brain of our AI Study Assistant
// This file starts an Express web server, listens for questions
// from the frontend, sends them to the Anthropic AI API,
// and sends the AI's answer back to the browser.
// ============================================================

// --- Load environment variables from our .env file ---
// This lets us keep the API key secret and out of our code.
require("dotenv").config();

// --- Import required packages ---
const express = require("express");   // Web server framework
const cors = require("cors");         // Allows frontend to talk to backend
const path = require("path");         // Helps build file paths correctly
const Anthropic = require("@anthropic-ai/sdk"); // Official Anthropic SDK

// --- Create the Express app ---
const app = express();

// --- Set which port the server listens on ---
// It will use the PORT from .env if set, otherwise default to 3000.
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE — Code that runs on every incoming request
// ============================================================

// Allow requests from any origin (needed when frontend/backend
// run on different ports during development).
app.use(cors());

// Automatically parse incoming JSON request bodies.
// This lets us read req.body in our route handlers.
app.use(express.json());

// Serve all files inside the "public" folder as static files.
// When a user visits http://localhost:3000, Express will
// automatically serve public/index.html.
app.use(express.static(path.join(__dirname, "public")));

// ============================================================
// SET UP ANTHROPIC CLIENT
// ============================================================

// Create the Anthropic client using the API key from .env
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================================
// ROUTES — These define what the server does for each URL
// ============================================================

// --- POST /api/ask ---
// The frontend sends the student's question to this route.
// We forward it to Claude and return the answer as JSON.
app.post("/api/ask", async (req, res) => {
  // --- Step 1: Read the user's question from the request body ---
  const { question } = req.body;

  // --- Step 2: Validate — make sure a question was actually sent ---
  if (!question || question.trim() === "") {
    // Send back a 400 Bad Request error with a clear message
    return res.status(400).json({
      error: "Please enter a question or some notes before submitting.",
    });
  }

  // --- Step 3: Check that the API key exists ---
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY is missing from your .env file!");
    return res.status(500).json({
      error:
        "Server configuration error: API key is missing. Check your .env file.",
    });
  }

  // --- Step 4: Send the question to the Anthropic Claude API ---
  try {
    console.log(`📚 Received question: "${question.substring(0, 80)}..."`);

    // Build the system prompt — this tells Claude HOW to behave.
    // Adjust this to change the AI's teaching style.
    const systemPrompt = `You are a friendly, encouraging, and expert study assistant. 
Your job is to help students understand topics clearly. 
When answering:
- Break complex ideas into simple steps.
- Use examples, analogies, or bullet points where helpful.
- Keep your tone warm, patient, and motivating.
- If the student pastes notes, summarize and explain them clearly.
- If asked to quiz the student, create practice questions.
- Always end with a short encouraging note or a tip for further study.`;

    // Call the Anthropic Messages API
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",          // The Claude model to use
      max_tokens: 1024,                   // Max length of the AI's reply
      system: systemPrompt,              // The system instructions above
      messages: [
        {
          role: "user",
          content: question,             // The student's actual question
        },
      ],
    });

    // --- Step 5: Extract the text reply from the API response ---
    // The API returns an array of content blocks; we grab the first text block.
    const answer = message.content[0].text;

    console.log("✅ AI response received successfully.");

    // --- Step 6: Send the answer back to the frontend as JSON ---
    res.json({ answer });

  } catch (error) {
    // --- Handle errors from the Anthropic API ---
    console.error("❌ Error calling Anthropic API:", error.message);

    // Give the user a helpful error message
    res.status(500).json({
      error:
        "Something went wrong while contacting the AI. Please try again in a moment.",
    });
  }
});

// --- GET /health ---
// A simple health check route so you can confirm the server is running.
// Visit http://localhost:3000/health in your browser to test it.
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Study Assistant server is running!" });
});

// ============================================================
// START THE SERVER
// ============================================================

app.listen(PORT, () => {
  console.log("======================================");
  console.log(`🎓 AI Study Assistant is running!`);
  console.log(`🌐 Open in browser: http://localhost:${PORT}`);
  console.log(`🔍 Health check:    http://localhost:${PORT}/health`);
  console.log("======================================");
});
