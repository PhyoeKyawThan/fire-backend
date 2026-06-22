import express from "express";
import cors from "cors";
import { validateToken } from "./utils/authMiddleware";
import incidentRoutes from "./routes/incidentRoutes";
import publicRoutes from "./routes/publicRoutes";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/incidents", validateToken, incidentRoutes); 
app.use("/public", publicRoutes);

export default app;