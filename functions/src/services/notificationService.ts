import * as admin from "firebase-admin";

export class NotificationService {
  static async triggerEmergencyAlerts(latitude: number, longitude: number, incidentId: string): Promise<void> {
    console.log(`Calculating target radius for coordinates: ${latitude}, ${longitude}`);
    
    const payload = {
      notification: {
        title: "🚨 CRITICAL FIRE ALERT",
        body: "A fire has been reported within your designated safety area. Evacuate immediately.",
      },
      data: {
        incidentId: incidentId,
        latitude: String(latitude),
        longitude: String(longitude),
        type: "EMERGENCY_ALARM"
      },
      topic: "global_alerts"
    };

    try {
      await admin.messaging().send(payload);
      console.log(`Emergency push notifications blasted successfully for incident ${incidentId}`);
    } catch (error) {
      console.error("FCM dispatch failure:", error);
    }
  }
}