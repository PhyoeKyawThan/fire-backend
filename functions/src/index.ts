import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { onRequest } from "firebase-functions/v2/https";
import app from "./app";

export const api = onRequest(app);

export { onUserCreated } from "./triggers/authTriggers";
export { onIncidentCreated } from "./triggers/firestoreTriggers";