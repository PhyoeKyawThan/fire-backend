import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { NotificationService } from "../services/notificationService";

export const onIncidentCreated = onDocumentCreated("incidents/{incidentId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();
  const { latitude, longitude } = data;

  await NotificationService.triggerEmergencyAlerts(latitude, longitude, event.params.incidentId);
});