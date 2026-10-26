import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
console.log("Key loaded from .env:", !!process.env.GEMINI_API_KEY);

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.log("AI ERROR MESSAGE:", error.message);
    console.log("AI ERROR DETAILS:", error);

    res.status(500).json({
      error: error.message || "AI request failed"
    });
  }
});

app.listen(3000, () => {
  console.log("Chatbot running at http://localhost:3000");
});