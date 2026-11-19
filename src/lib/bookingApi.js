const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

 // === API REQUEST ===
 async function request(path, options = {}) {
   const response = await fetch(`${API_URL}${path}`, options);

   if (!response.ok) {
     throw new Error(
       `API request failed (${response.status}).`
     );
   }

   if (response.status === 204) {
     return null;
   }

   const text = await response.text();

   return text ? JSON.parse(text) : null;
 }

 // === EVENTS ===
 export function getEvents(signal) {
   return request("/events", { signal });
 }

 // === RESERVATIONS ===
 export function getEventReservations(eventId, signal) {
   return request(
     `/reservations?eventId=${encodeURIComponent(eventId)}`,
     { signal }
   );
 }

 // === CREATE RESERVATION ===
 export function createReservation(reservation) {
   return request("/reservations", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(reservation),
   });
 }

 // === DELETE RESERVATION ===
 // SECURITY: Do not expose guest cancellation without backend authorization.
export function deleteReservation(reservationId) {
   return request(
     `/reservations/${encodeURIComponent(reservationId)}`,
     {
       method: "DELETE",
     }
   );
 }
