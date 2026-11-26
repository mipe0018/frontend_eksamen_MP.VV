"use client";

import { useState } from "react";

// === TABLE SELECTION ===
export default function useBooking(eventId = "") {
  const [selectedTableIds, setSelectedTableIds] = useState([]);

  function toggleTable(tableId) {
    if (!eventId) return;

    setSelectedTableIds((previous) => {
      if (previous.includes(tableId)) {
        return previous.filter((id) => id !== tableId);
      }

      return [...previous, tableId];
    });
  }

  function resetTables() {
    setSelectedTableIds([]);
  }

  return {
    selectedTableIds,
    toggleTable,
    resetTables,
  };
}
