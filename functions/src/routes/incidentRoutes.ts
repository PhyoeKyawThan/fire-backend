import { Router, Response } from "express";
import * as admin from "firebase-admin";
import { AuthenticatedRequest } from "../types";
import { Timestamp } from "firebase-admin/firestore";

const router = Router();

router.post("/create", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { latitude, longitude, is_neighbor_report } = req.body;
  const db = admin.firestore();
  const reportedBy = req.user?.uid; 

  if (latitude === undefined || longitude === undefined) {
    res.status(400).json({ error: "Missing GPS coordinates (latitude/longitude)" });
    return;
  }

  try {
    const newIncidentRef = db.collection("incidents").doc();

    const incidentData = {
      id: newIncidentRef.id,
      latitude,
      longitude,
      reportedBy,
      status: "pending",
      proofUrl: null,
      is_neighbor_report: false,
      createdAt: Timestamp.now()
    };
    if(is_neighbor_report){
        incidentData.is_neighbor_report = true;
    }

    await newIncidentRef.set(incidentData);

    res.status(201).json({
      message: "Emergency alarm triggered instantly! Neighbors are being notified.",
      incidentId: newIncidentRef.id
    });
  } catch (error) {
    console.error("Error triggering emergency incident:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/verify-proof", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { incidentId, proofUrl } = req.body;
  const db = admin.firestore();

  if (!incidentId || !proofUrl) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }

  try {
    const incidentRef = db.collection("incidents").doc(incidentId);
    const doc = await incidentRef.get();

    if (!doc.exists) {
      res.status(404).json({ error: "Incident not found" });
      return;
    }

    await incidentRef.update({
      proofUrl: proofUrl,
      status: "verified"
    });

    res.status(200).json({ message: "Incident proof attached and status verified." });
  } catch (error) {
    console.error("Error verifying incident proof:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;