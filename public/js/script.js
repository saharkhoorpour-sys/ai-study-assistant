// ================================================================
// script.js — Frontend JavaScript for the AI Study Assistant
// ================================================================

// Main elements
const questionInput = document.getElementById("questionInput");
const submitBtn = document.getElementById("submitBtn");
const loadingIndicator = document.getElementById("loadingIndicator");
const responseCard = document.getElementById("responseCard");
const responseText = document.getElementById("responseText");
const errorMessage = document.getElementById("errorMessage");
const charCount = document.getElementById("charCount");
const resetBtn = document.getElementById("resetBtn");

// New elements
const examplePrompts = document.querySelectorAll(".example-prompt");
const modeButtons = document.querySelectorAll(".mode-btn");
const loadingText = document.querySelector(".loading-text");

let selectedMode = "Explain";

// ---------------------------------------------------------------
// Character count
// ---------------------------------------------------------------
questionInput.addEventListener("input", () => {
  charCount.textContent = questionInput.value.length;
  hideError();
});

// ---------------------------------------------------------------
// Example prompt buttons
// ---------------------------------------------------------------
examplePrompts.forEach((prompt) => {
  prompt.addEventListener("click", () => {
    questionInput.value = prompt.textContent;
    charCount.textContent = questionInput.value.length;
    hideError();
    questionInput.focus();
  });
});

// ---------------------------------------------------------------
// Mode buttons
// ---------------------------------------------------------------
modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active-mode"));
    button.classList.add("active-mode");
    selectedMode = button.textContent.trim();

    if (selectedMode === "Explain") {
      questionInput.placeholder =
        "e.g. Explain photosynthesis in simple terms";
    } else if (selectedMode === "Summarize") {
      questionInput.placeholder =
        "Paste your notes or paragraph here for a summary";
    } else if (selectedMode === "Quiz Me") {
      questionInput.placeholder =
        "e.g. Quiz me on the French Revolution";
    }

    questionInput.focus();
  });
});

// Set default active mode
modeButtons.forEach((btn) => {
  if (btn.textContent.trim() === "Explain") {
    btn.classList.add("active-mode");
  }
});

// ---------------------------------------------------------------
// Submit button
// ---------------------------------------------------------------
submitBtn.addEventListener("click", async () => {
  const rawQuestion = questionInput.value.trim();

  if (!rawQuestion) {
    showError("Please type a question or paste some notes before submitting.");
    questionInput.focus();
    return;
  }

  let question = rawQuestion;

  if (selectedMode === "Explain") {
    question = `Explain this clearly and simply: ${rawQuestion}`;
  } else if (selectedMode === "Summarize") {
    question = `Summarize this in a clear and simple way: ${rawQuestion}`;
  } else if (selectedMode === "Quiz Me") {
    question = `Create a short quiz based on this topic: ${rawQuestion}`;
  }

  showLoading(true);
  hideError();
  hideResponse();

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const msg = data.error || "Something went wrong. Please try again.";
      showError(msg);
      return;
    }

    displayResponse(data.answer);
  } catch (networkError) {
    console.error("Network error:", networkError);
    showError("Could not reach the server. Please try again.");
  } finally {
    showLoading(false);
  }
});

// ---------------------------------------------------------------
// Reset button
// ---------------------------------------------------------------
resetBtn.addEventListener("click", () => {
  questionInput.value = "";
  charCount.textContent = "0";
  hideResponse();
  hideError();
  questionInput.focus();
});

// ================================================================
// Helper functions
// ================================================================

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("visible");
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");
}

function showLoading(isLoading) {
  if (isLoading) {
    loadingIndicator.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").textContent = "Thinking...";

    if (selectedMode === "Explain") {
      loadingText.textContent = "Breaking this topic into simple steps...";
    } else if (selectedMode === "Summarize") {
      loadingText.textContent = "Reading through your notes...";
    } else if (selectedMode === "Quiz Me") {
      loadingText.textContent = "Preparing your quiz...";
    } else {
      loadingText.textContent = "Your AI tutor is thinking...";
    }
  } else {
    loadingIndicator.classList.add("hidden");
    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text").textContent = "Ask the AI Tutor";
    loadingText.textContent = "Your AI tutor is thinking...";
  }
}

function displayResponse(answer) {
  responseText.textContent = answer;
  responseCard.classList.remove("hidden");
  responseCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideResponse() {
  responseCard.classList.add("hidden");
  responseText.textContent = "";
}
