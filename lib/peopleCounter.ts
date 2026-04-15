import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

export const incrementPeople = async () => {
  const ref = doc(db, "stats", "people");

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { count: 1 });
  } else {
    await updateDoc(ref, {
      count: increment(1),
    });
  }
};

export const decrementPeople = async () => {
  const ref = doc(db, "stats", "people");

  await updateDoc(ref, {
    count: increment(-1),
  });
};