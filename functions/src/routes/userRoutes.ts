// import { Router, Response } from "express";
// import * as admin from "firebase-admin";
// import { AuthenticatedRequest } from "../types";
// import { Timestamp } from "firebase-admin/firestore";

// const router = Router();

// router.post("/update-location", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   const { latitude, longitude, is_neighbor_report } = req.body;
//   const db = admin.firestore();
  
//   // Extract the user's UID from the authenticated token
//   const uid = req.user?.uid; 

//   if (!uid) {
//     res.status(401).json({ error: "Unauthorized: User ID not found in token." });
//     return;
//   }

//   if (latitude === undefined || longitude === undefined) {
//     res.status(400).json({ error: "Missing GPS coordinates (latitude/longitude)" });
//     return;
//   }

//   try {
//     // 1. Target the SPECIFIC user's document using their Auth UID
//     const userRef = db.collection("users").doc(uid);

//     // 2. Build the update payload tracking just their location tracking data
//     const locationUpdate: any = {
//       latitude,
//       longitude,
//       lastLocationUpdate: Timestamp.now()
//     };

//     // If you pass 'is_neighbor_report' flag from the client app, track it here
//     if (is_neighbor_report !== undefined) {
//       locationUpdate.is_neighbor_report = !!is_neighbor_report;
//     }

//     // 3. Use 'set' with { merge: true } so we update coordinates without erasing name/email
//     await userRef.set(locationUpdate, { merge: true });

//     res.status(200).json({
//       message: "User location updated successfully.",
//       uid: uid
//     });
//   } catch (error) {
//     console.error("Error updating user location:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;