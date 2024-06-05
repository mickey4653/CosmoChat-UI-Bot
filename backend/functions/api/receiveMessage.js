const functions = require("firebase-functions");

exports.receiveMessage = functions.firestore
    .document("chat/{userId}/messages/{messageId}")
    .onCreate((snapshot, context) => {
      const newMessage = snapshot.data();
      console.log("New message:", newMessage);
    // You can perform additional actions with the new message here
    });
