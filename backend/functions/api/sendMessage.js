/* eslint-disable max-len */
// const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config("/backend/functions/.env");
// {path: "../.env"}
const cors = require("cors")({origin: true});
const {OpenAI} = require("openai");

const apiKey = process.env.COSMOCHAT_OPENAI_API_KEY;

const openai = new OpenAI({apiKey});
// const openai = new OpenAI(functions.config().openai.key);

exports.sendMessage = async (req, res) => {
  cors(req, res, async () => {
    try {
      const {text, userId} = req.body;

      if (!text || !userId) {
        return res.status(400).json({
          error: "Required fields {text & userId} are missing",
        });
      }

      const messageData = {
        text,
        userId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      const messageRef = await admin
          .firestore()
          .collection("chat")
          .doc(userId)
          .collection("messages")
          .add(messageData);

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Your name is ReX. You are a career advice assistant. you give advice to Michael about his career or anything in general.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 100,
      });

      const botResponse = response.choices[0].message.content;
      const botMessageData = {
        text: botResponse.trim(),
        userId: "bot",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      await admin
          .firestore()
          .collection("chat")
          .doc(userId)
          .collection("messages")
          .add(botMessageData);

      res
          .status(200)
          .json({status: "success", messageId: messageRef.id});
    } catch (error) {
      console.error("Error sending message:", error);
      res
          .status(500)
          .json({error: "An error occurred while sending the message"});
    }
  });
};

