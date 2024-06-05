import { getFirestore, collection, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import app from '../firebase'; 

const db = getFirestore(app);

const addUserActivity = async (date, hours) => {
  try {
    const docRef = doc(collection(db, 'userActivity'), date);
    await setDoc(docRef, { hours });
    console.log(`Activity for ${date} added successfully.`);
  } catch (error) {
    console.error("Error adding user activity:", error);
  }
};

const incrementUserActivity = async (date) => {
    try {
      const docRef = doc(collection(db, 'userActivity'), date);
      await updateDoc(docRef, { hours: increment(1) });
      console.log(`Activity for ${date} incremented successfully.`);
    } catch (error) {
      if (error.code === 'not-found') {
        await addUserActivity(date, 1);
      } else {
        console.error("Error incrementing user activity:", error);
      }
    }
  };


export { addUserActivity, incrementUserActivity, db };
