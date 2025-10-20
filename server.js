
// A simple Express server to handle TradingView alerts and send them to Telegram.

// Import the Express module
const express = require("express");
// Import the 'node-fetch' package for making HTTP requests (required for older Node versions on some platforms)
const fetch = require('node-fetch');

// Create an Express application
const app = express();

// Middleware to parse incoming request bodies as plain text.
// TradingView sends its alerts with a 'text/plain' content-type.
app.use(express.text());

// Retrieve the Telegram Bot Token and Chat ID from environment variables.
// On Render, these are set in the 'Environment' section of your service.
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// --- ROUTES ---

// 1. Health check route
// A simple GET route to confirm that the server is online and running.
app.get("/", (req, res) => {
  res.status(200).send("TradingView to Telegram Webhook is active!");
});

// 2. The main webhook route
// This POST route is the endpoint where TradingView will send its alert messages.
app.post("/webhook", async (req, res) => {
  // Log the incoming message for debugging purposes.
  console.log("Webhook alert received:", req.body);

  // Check for server configuration errors.
  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.");
    return res.status(500).send("Server configuration error: Missing secrets.");
  }

  // The alert message from TradingView is the entire request body.
  const message = req.body;

  // Construct the URL for the Telegram Bot API's `sendMessage` method.
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    // Send the message to the Telegram API using a fetch request.
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The body of the request to Telegram must be a JSON object
      // specifying the target chat_id and the text of the message.
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // Parse the JSON response from the Telegram API.
    const responseData = await response.json();

    // Check if Telegram confirmed the message was sent successfully.
    if (responseData.ok) {
      console.log("Alert successfully forwarded to Telegram.");
      // Respond to TradingView with a success message.
      res.status(200).send("Alert sent to Telegram.");
    } else {
      console.error("Failed to send alert to Telegram:", responseData.description);
      // If Telegram returns an error, forward it in the response to TradingView.
      res.status(500).send(`Telegram API Error: ${responseData.description}`);
    }
  } catch (error) {
    // Catch any network or other errors during the process.
    console.error("Error forwarding alert to Telegram:", error);
    res.status(500).send("Internal server error while contacting Telegram.");
  }
});

// --- START THE SERVER ---

// Render provides the PORT environment variable.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

