// ================================================================
// script.js — Frontend JavaScript for the AI Study Assistant
//
// This file handles all user interactions on the page:
//   1. Reads what the user typed
//   2. Sends it to the backend using fetch()
//   3. Shows a loading animation while waiting
//   4. Displays the AI's answer (or an error message)
// ================================================================


// ----------------------------------------------------------------
// STEP 1: Get references to the HTML elements we need to work with
// ----------------------------------------------------------------

// The big text box where the user types their question
const questionInput = document.getElementById("questionInput");

// The submit button
const submitBtn = document.getElementById("submitBtn");

// The spinning dots + "thinking..." message
const loadingIndicator = document.getElementById("loadingIndicator");

// The card that holds the AI's response
const responseCard = document.getElementById("responseCard");

// The element inside the card where the answer text goes
const responseText = document.getElementById("responseText");

// The error message element (shown on bad input or server error)
const errorMessage = document.getElementById("errorMessage");

// The character counter below the textarea
const charCount = document.getElementById("charCount");

// The "Ask another question" button inside the response card
const resetBtn = document.getElementById("resetBtn");


// ----------------------------------------------------------------
// STEP 2: Update the character count as the user types
// ----------------------------------------------------------------

questionInput.addEventListener("input", () => {
  // Count how many characters have been typed
  const count = questionInput.value.length;
  charCount.textContent = count;

  // If there's an error showing, hide it as soon as the user starts typing again
  hideError();
});


// ----------------------------------------------------------------
// STEP 3: Handle the submit button click
// ----------------------------------------------------------------

submitBtn.addEventListener("click", async () => {
  // Read the question from the textarea, removing extra whitespace
  const question = questionInput.value.trim();

  // --- Validate: don't send an empty question ---
  if (!question) {
    showError("Please type a question or paste some notes before submitting!");
    questionInput.focus(); // Move cursor back to the textarea
    return; // Stop here — don't proceed
  }

  // --- All good! Start the request process ---
  showLoading(true);   // Show the spinning dots
  hideError();         // Make sure no old error is visible
  hideResponse();      // Hide any old response

  try {
    // -------------------------------------------------------
    // STEP 4: Send the question to the backend using fetch()
    //
    // fetch() makes an HTTP request to our Express server.
    // We use POST because we're sending data (the question).
    // The backend is at /api/ask (defined in server.js).
    // -------------------------------------------------------
    const response = await fetch("/api/ask", {
      method: "POST",                        // Use POST to send data
      headers: {
        "Content-Type": "application/json",  // Tell the server we're sending JSON
      },
      body: JSON.stringify({ question }),    // Convert our data to a JSON string
    });

    // -------------------------------------------------------
    // STEP 5: Parse the response from the server
    //
    // The server sends back JSON. We convert it to a JS object.
    // -------------------------------------------------------
    const data = await response.json();

    // -------------------------------------------------------
    // STEP 6: Check if the server reported an error
    //
    // Even if the request "succeeded" (HTTP 200), the server
    // might send back an { error: "..." } object. We check both.
    // -------------------------------------------------------
    if (!response.ok || data.error) {
      // Show the server's error message, or a generic fallback
      const msg = data.error || "Something went wrong. Please try again.";
      showError(msg);
      return; // Don't display a response card
    }

    // -------------------------------------------------------
    // STEP 7: Display the AI's answer on the page
    // -------------------------------------------------------
    displayResponse(data.answer);

  } catch (networkError) {
    // This runs if the fetch itself fails — e.g. the server is not running
    console.error("Network error:", networkError);
    showError(
      "Could not reach the server. Make sure the backend is running with 'npm start'."
    );
  } finally {
    // Always hide the loading spinner when done, whether success or error
    showLoading(false);
  }
});


// ----------------------------------------------------------------
// STEP 8: Handle the "Ask another question" button
// ----------------------------------------------------------------

resetBtn.addEventListener("click", () => {
  // Clear the textarea so the user can start fresh
  questionInput.value = "";
  charCount.textContent = "0";

  // Hide the response card
  hideResponse();

  // Move the cursor to the input box
  questionInput.focus();
});


// ================================================================
// HELPER FUNCTIONS
// These keep our main code clean and readable.
// ================================================================

/**
 * showError(message)
 * Shows a red error message box with the given text.
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("visible");   // CSS .visible sets display: block
}

/**
 * hideError()
 * Hides the error message box.
 */
function hideError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");
}

/**
 * showLoading(isLoading)
 * Shows or hides the loading indicator and disables the submit button.
 * Pass true to show, false to hide.
 */
function showLoading(isLoading) {
  if (isLoading) {
    loadingIndicator.classList.remove("hidden");  // Show the dots
    submitBtn.disabled = true;                     // Disable the button
    submitBtn.querySelector(".btn-text").textContent = "Thinking…";
  } else {
    loadingIndicator.classList.add("hidden");      // Hide the dots
    submitBtn.disabled = false;                    // Re-enable the button
    submitBtn.querySelector(".btn-text").textContent = "Ask the AI Tutor";
  }
}

/**
 * displayResponse(answer)
 * Takes the AI's answer string and renders it inside the response card.
 */
function displayResponse(answer) {
  // Put the answer text inside the response div
  // We use textContent (not innerHTML) to keep it safe from any HTML injection.
  responseText.textContent = answer;

  // Show the response card (remove the "hidden" CSS class)
  responseCard.classList.remove("hidden");

  // Smoothly scroll down so the user can see the answer
  responseCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * hideResponse()
 * Hides the response card (so we can show a fresh one next time).
 */
function hideResponse() {
  responseCard.classList.add("hidden");
  responseText.textContent = "";
}
