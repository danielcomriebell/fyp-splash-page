import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import { getFirestore, query, getDocs, doc, updateDoc, collection, where, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBacJUUwY011x9owfU9kOkwoRrq0CmaII",
  authDomain: "fyp-page.firebaseapp.com",
  projectId: "fyp-page",
  storageBucket: "fyp-page.appspot.com",
  messagingSenderId: "491227634959",
  appId: "1:491227634959:web:8315ccc744c8805159727a"
};

// Initialize Firebase
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const auth = getAuth(app);
const db = getFirestore(app);

const updateUser = async (userUID, updateObj) => {
  // Fetch the user document based on the uid field
  const q = query(collection(db, "users"), where("uid", "==", userUID));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.error('No record found');
    return;
  }

  const userDoc = snapshot.docs[0];

  // Create a new batch instance
  const batchUpdate = writeBatch(db);

  // Update the user data
  batchUpdate.update(userDoc.ref, updateObj);

  // If the user has passes and the name is being updated, update the customer_name for each pass
  if (updateObj.hasOwnProperty('name')) {
    const userPasses = userDoc.data().passes || [];

    userPasses.forEach(passId => {
      const passDocRef = doc(db, "passes", passId);
      // Update the customer_name in each pass
      batchUpdate.update(passDocRef, { customer_name: updateObj.name });
    });
  }

  // Commit the batch
  await batchUpdate.commit();
};


const signInWithPhone = async (phone) => {
  try {
    // console.log(phone);
    const number = removeCharsFromArray(phone.split(""));
    let result = '+1'.concat(...number);

    if (result.length < 10) {
      throw new Error("Invalid phone number length");
    }

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {}
    }, auth);

    const confirmationResult = await signInWithPhoneNumber(auth, result, recaptchaVerifier);

    return confirmationResult;

  } catch (error) {
    console.error("signInWithPhone error:", error);
    throw error;
  }
};

const removeCharsFromArray = (chars) => {
  const filteredChars = chars.filter(char => !["(", ")", "-", " "].includes(char));
  return filteredChars;
};


const logout = async () => {
  await signOut(auth);
};


export {
  auth,
  db,
  signInWithPhone,
  updateUser,
  logout,
};