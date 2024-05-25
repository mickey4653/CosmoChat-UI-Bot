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
