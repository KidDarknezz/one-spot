const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.https.onCall((data, context) => {
  if (context.auth.token.isAdmin !== true) {
    return {
      error: "Request not authorized.",
    };
  }
  admin
    .auth()
    .createUser({
      email: data.email,
      password: data.password,
    })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord.uid);
      admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set({
          name: data.name,
          email: data.email,
          role: data.type,
          createdAt: Date.now(),
          profile: data.profile ? data.profile.name : "",
        })
        .then((writeResult) => {
          console.log(`Document written at: ${writeResult.writeTime.toDate()}`);
        });
      if (data.type == "client")
        admin.auth().setCustomUserClaims(userRecord.uid, { isClient: true });
      if (data.type == "admin")
        admin.auth().setCustomUserClaims(userRecord.uid, { isAdmin: true });

      if (data.profile) {
        const bucket = admin
          .storage()
          .bucket(`users-profile/${userRecord.uid}`);
        const file = bucket.file(data.profile.name);
        const contents = JSON.stringify(data.profile.name, null, 2);
        file.save(contents, function(err) {
          if (!err) {
            console.log("profile created");
          }
        });
      }
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
});
