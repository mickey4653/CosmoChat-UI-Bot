const admin = require("firebase-admin");
const serviceAccount = require("./cosmo-service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cosmochat-ui-7b128-default-rtdb.firebaseio.com/",
});

const db = admin.firestore(); // Initialize Firestore

const messageCollection = db.collection("messages");
messageCollection.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      // Handle new message added to the collection
      console.log("New message:", change.doc.data());
    }
  });
}, (error) => {
  console.error("Error fetching messages:", error);
});
