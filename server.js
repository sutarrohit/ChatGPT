const PORT = 5000;
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const API_KEY = process.env.API_KEY;

// Middleware
app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Your server is runnnig on port", PORT);
});
