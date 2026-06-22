import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  const userRef = db.collection("users").doc(user.uid);

  const defaultProfile = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || "Anonymous Neighbor",
    phoneNumber: user.phoneNumber || null,
    role: "citizen", 
    createdAt: Timestamp.now()
  };

  try {
    await userRef.set(defaultProfile);
    console.log(`[Auth] Saved Firestore profile for user: ${user.uid}`);
  } catch (error) {
    console.error(`[Auth] Error saving profile for ${user.uid}:`, error);
  }
});