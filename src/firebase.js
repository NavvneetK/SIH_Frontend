// Import and configure Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase (use your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyATcLkUpthNJqO7TSRRl_VcvT9nfpyBil8",
    authDomain: "classroom-74aa1.firebaseapp.com",
    projectId: "classroom-74aa1",
    storageBucket: "classroom-74aa1.appspot.com",
    messagingSenderId: "860091563443",
    appId: "1:860091563443:web:960980f6e1f7a313ec1fc6",
    measurementId: "G-686892RZ3H"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Function to fetch data based on boolean value
async function fetchDataBasedOnBoolean() {
  try {
    // Reference to your Firestore collection
    const collectionRef = db.collection('yourCollectionName');

    // Query for documents where the boolean field is true
    const queryTrue = collectionRef.where('booleanField', '==', true);
    const snapshotTrue = await queryTrue.get();

    // Fetch data where booleanField is true
    if (!snapshotTrue.empty) {
      snapshotTrue.forEach(doc => {
        console.log('Data with booleanField true:', doc.id, '=>', doc.data());
      });
    } else {
      console.log('No documents where booleanField is true.');
    }

    // Query for documents where the boolean field is false
    const queryFalse = collectionRef.where('booleanField', '==', false);
    const snapshotFalse = await queryFalse.get();

    // Fetch data where booleanField is false
    if (!snapshotFalse.empty) {
      snapshotFalse.forEach(doc => {
        console.log('Data with booleanField false:', doc.id, '=>', doc.data());
      });
    } else {
      console.log('No documents where booleanField is false.');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function
fetchDataBasedOnBoolean();