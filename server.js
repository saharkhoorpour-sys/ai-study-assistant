// ============================================================
// server.js — AI Study Assistant (with fallback mode)
// ============================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Route: Ask AI
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({
      error: "Please enter a question before submitting.",
    });
  }

  try {
    console.log(`📚 Question: ${question}`);

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer = message.content[0].text;

    res.json({ answer });

  } catch (error) {
    console.error("❌ API failed — using fallback:", error.message);

    // 🔁 FALLBACK RESPONSE (NO API REQUIRED)
    const fallbackAnswer = `
🤖 AI temporarily unavailable — here’s a helpful explanation instead:

"${question}"

📌 Simple explanation:
This concept can be understood by breaking it into smaller parts. Focus on:
- The main idea behind the concept
- How it connects to something you already know
- Why it is important

📌 Example:
Think about how this would apply in a real-world situation. Try to imagine it step by step.

💡 Study tip:
If something feels confusing, break it into smaller questions and tackle them one at a time.
`;

    res.json({ answer: fallbackAnswer });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log("======================================");
  console.log(`🎓 AI Study Assistant running on port ${PORT}`);
  console.log("======================================");
});
