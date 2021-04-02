const functions = require("firebase-functions");
const admin = require('firebase-admin')
admin.initializeApp();

exports.createUser = functions.https.onCall((data, context) => {
  if (context.auth.token.isAdmin !== true) {
    return {
      error: 'Request not authorized.'
    }
  }
  admin.auth().createUser({
    email: data.email,
    password: data.password,
  })
  .then((userRecord) => {
    console.log('Successfully created new user:', userRecord.uid);
    admin.firestore().collection('users').doc(userRecord.uid).set({name: data.name, email: data.email, role: data.type}).then(writeResult => {
      console.log(`Document written at: ${writeResult.writeTime.toDate()}`)
    })
    if (data.type == 'client')
      admin.auth().setCustomUserClaims(userRecord.uid, { isClient: true})
    if (data.type == 'admin')
      admin.auth().setCustomUserClaims(userRecord.uid, { isAdmin: true})
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
});