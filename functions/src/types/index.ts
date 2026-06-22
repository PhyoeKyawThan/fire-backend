import { Request } from "express";
import * as admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export interface FireIncident {
  latitude: number;
  longitude: number;
  reportedBy: string;
  status: "pending" | "verified" | "false-alarm" | "resolved";
  proofUrl?: string;
  createdAt: admin.firestore.Timestamp;
}