const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

// Allow your admin panel to talk to this server
app.use(cors({ origin: "*" }));
app.use(express.json());
// Serve all static HTML/CSS/JS files in this folder
app.use(express.static(__dirname));
// Initialize Firebase Admin securely via Environment Variables
// (You will set FIREBASE_SERVICE_ACCOUNT in Render.com's dashboard later)
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin Initialized successfully.");
} catch (error) {
  console.error(
    "Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it is set in Render Env Vars.",
    error,
  );
}

// The webhook endpoint your admin.html calls
app.post("/send-push", async (req, res) => {
  const { tokens, title, body } = req.body;

  if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
    return res.status(400).json({ error: "No valid tokens provided" });
  }

  // Firebase Admin format for sending to multiple devices at once
  const message = {
    notification: {
      title: title || "New Update",
      body: body || "You have a new notification.",
    },
    tokens: tokens,
  };

  try {
    // sendEachForMulticast is the modern, optimal way to send batch notifications
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`${response.successCount} messages were sent successfully`);

    // If some tokens failed (e.g., user uninstalled), you could optionally clean them up here
    if (response.failureCount > 0) {
      console.log(`${response.failureCount} messages failed to send.`);
    }

    res
      .status(200)
      .json({
        success: true,
        sentCount: response.successCount,
        failedCount: response.failureCount,
      });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Render automatically assigns a PORT, or defaults to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shadik Push Server running on port ${PORT}`);
});
