/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

exports.fetchMessages = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({error: "Missing userId parameter"});
      }

      const messageRef = await admin
          .firestore()
          .collection("chat")
          .doc(userId)
          .collection("messages")
          .orderBy("timestamp", "asc");
      const snapshot = await messageRef.get();
      if (snapshot.empty) {
        // return res.status(404).json({error: "No messages found"});
        return res.status(200).json({messages: []}); // Return an empty array if no messages found
      }
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Fetched message:", {id: doc.id, ...data});
        return {
          id: doc.id,
          ...data,
        };
      });

      res.status(200).json({messages});
    } catch (error) {
      console.error("Error fetching messages:", error);
      res
          .status(500)
          .json({error: "An error occurred while fetching messages"});
    }
  });
});
