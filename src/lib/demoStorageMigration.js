// === DEMO STORAGE MIGRATION ===
// Older browser reservations are copied once to the new project keys.
export function migrateDemoStorage() {
  if (typeof window === "undefined") return;

  const previousPrefix = ["ask", "experts"].join("");
  const entries = [
    ["demo-reservations", "demo-reservations"],
    ["last-demo-booking", "last-demo-booking"],
  ];

  for (const [oldSuffix, newSuffix] of entries) {
    const oldKey = `${previousPrefix}-${oldSuffix}`;
    const newKey = `frontend-eksamen-26-${newSuffix}`;
    if (localStorage.getItem(newKey) !== null) continue;
    const previousValue = localStorage.getItem(oldKey);
    if (previousValue !== null) {
      localStorage.setItem(newKey, previousValue);
    }
  }
}
