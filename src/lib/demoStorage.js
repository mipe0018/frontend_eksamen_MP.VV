// === DEMO STORAGE ===
export const DEMO_STORAGE_KEY = "frontendeksamen-demo-reservations";
export const DEMO_LAST_BOOKING_KEY = "frontendeksamen-last-demo-booking";

// Flyt kun tidligere data, hvis den nye nøgle endnu ikke findes.
export function migrateDemoStorage() {
  if (typeof window === "undefined") return;

  const legacyKeys = [
    ["frontend-eksamen-26-demo-reservations", DEMO_STORAGE_KEY],
    ["frontend-eksamen-26-last-demo-booking", DEMO_LAST_BOOKING_KEY],
    ["askexperts-demo-reservations", DEMO_STORAGE_KEY],
    ["askexperts-last-demo-booking", DEMO_LAST_BOOKING_KEY],
  ];

  for (const [oldKey, newKey] of legacyKeys) {
    if (localStorage.getItem(newKey) !== null) continue;
    const value = localStorage.getItem(oldKey);
    if (value !== null) localStorage.setItem(newKey, value);
  }
}
