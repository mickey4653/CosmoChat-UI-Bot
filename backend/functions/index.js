const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Enable CORS with origin set to true
const cors = require("cors")({origin: true});
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.status(200).send("Hello from Firebase!");
  });
});

const {sendMessage} = require("./api/sendMessage");
const {receiveMessage} = require("./api/receiveMessage");
const {fetchMessages} = require("./api/fetchMessage");

exports.sendMessage = functions.https.onRequest(sendMessage);
exports.receiveMessage = functions.https.onRequest(receiveMessage);
exports.fetchMessages = functions.https.onRequest(fetchMessages);
