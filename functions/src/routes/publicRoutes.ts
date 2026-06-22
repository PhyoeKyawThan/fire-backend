import { Router, Request, Response } from "express";
import * as admin from "firebase-admin";

const router = Router();

router.get("/news", async (req: Request, res: Response) => {
  const db = admin.firestore();
  try {
    const snapshot = await db.collection("news").orderBy("createdAt", "desc").limit(20).get();
    const newsItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(newsItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity news" });
  }
});

export default router;