"use client";

import { useEffect, useState } from "react";
import { DEMO_STORAGE_KEY, migrateDemoStorage } from "@/lib/demoStorage";

import { getEventReservations } from "@/lib/bookingApi";

// === DEMO CONFIG ===
const DEMO_EVENT_ID = "demo-event";

const DEMO_RESERVED_TABLES = [3, 8, 13];

// === DEMO RESERVATIONS ===
function getDemoReservations() {
  migrateDemoStorage();
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);

    const reservations = stored
      ? JSON.parse(stored)
      : [];

    if (!Array.isArray(reservations)) {
      throw new Error("Invalid demo reservation data.");
    }

    const exampleReservations = DEMO_RESERVED_TABLES.map(
      (tableId) => ({
        id: `demo-example-${tableId}`,
        eventId: DEMO_EVENT_ID,
        table: String(tableId),
        isDemo: true,
      })
    );

    return [...exampleReservations, ...reservations];
  } catch (error) {
    console.error("Could not load demo reservations:", error);

    return DEMO_RESERVED_TABLES.map((tableId) => ({
      id: `demo-example-${tableId}`,
      eventId: DEMO_EVENT_ID,
      table: String(tableId),
      isDemo: true,
    }));
  }
}

// === RESERVATION STATE ===
export default function useEventReservations(eventId) {
  const [refreshKey, setRefreshKey] = useState(0);

  const [result, setResult] = useState({
    eventId: "",
    reservations: [],
    loading: false,
    error: "",
    loaded: false,
    refreshKey: 0,
  });

  useEffect(() => {
    if (!eventId) return;

    const controller = new AbortController();

    async function loadReservations() {
      setResult({
        eventId,
        reservations: [],
        loading: true,
        error: "",
        loaded: false,
        refreshKey,
      });

      try {
        let data;

        if (eventId === DEMO_EVENT_ID) {
          data = getDemoReservations();
        } else {

          data = await getEventReservations(
            eventId,
            controller.signal
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid reservation data.");
        }

        if (controller.signal.aborted) return;

        setResult({
          eventId,
          reservations: data,
          loading: false,
          error: "",
          loaded: true,
          refreshKey,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Could not load reservations:", error);

        setResult({
          eventId,
          reservations: [],
          loading: false,
          error: "Could not load table availability.",
          loaded: false,
          refreshKey,
        });
      }
    }

    loadReservations();

    return () => controller.abort();
  }, [eventId, refreshKey]);

  const isCurrent =
    result.eventId === eventId &&
    result.refreshKey === refreshKey;

  const isLoaded =
    Boolean(eventId) &&
    isCurrent &&
    result.loaded;

  const occupiedTableIds = isLoaded
    ? [
        ...new Set(
          result.reservations
            .map((reservation) => Number(reservation.table))
            .filter(Number.isFinite)
        ),
      ]
    : [];

  function refreshReservations() {
    setRefreshKey((previous) => previous + 1);
  }

  return {
    reservations: isLoaded ? result.reservations : [],

    occupiedTableIds,

    loading:
      Boolean(eventId) &&
      (!isCurrent || result.loading),

    error: isCurrent ? result.error : "",

    isLoaded,

    refreshReservations,
  };
}
