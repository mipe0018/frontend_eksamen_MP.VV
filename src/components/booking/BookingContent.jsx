"use client";

import {
  Suspense,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import { useRouter, useSearchParams } from "next/navigation";

import EventSelector from "./EventSelector.jsx";
import TableGrid from "./TableGrid.jsx";
import BookingForm from "./BookingForm.jsx";

import useBooking from "@/hooks/booking/useBooking";
import useEventReservations from "@/hooks/booking/useEventReservations";

import { getEvents } from "@/lib/bookingApi";
import { DEMO_STORAGE_KEY, DEMO_LAST_BOOKING_KEY, migrateDemoStorage } from "@/lib/demoStorage";

const subscribe = () => () => {};

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

// === DEMO EVENT ===
function createDemoEvent() {
  const date = new Date();

  date.setDate(date.getDate() + 30);
  date.setHours(20, 0, 0, 0);

  return {
    id: "demo-event",
    title: "Demo Night – Experience the Club",
    date: date.toISOString(),
    doorsOpen: date.toISOString(),
    isDemo: true,
  };
}

// === EVENT AVAILABILITY ===
function isEventBookable(event) {
  if (!event) return false;

  if (event.isDemo) return true;

  const date = event.doorsOpen ?? event.date;

  if (!date || Number.isNaN(Date.parse(date))) {
    return false;
  }

  return new Date(date) > new Date();
}

function normalizeTableIds(value) {
  if (value == null) return [];

  const values = Array.isArray(value)
    ? value
    : String(value).split(",");

  return values
    .map((id) => Number(String(id).trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
}

// === RESTORE BOOKING ===
function getLastDemoBooking() {
  migrateDemoStorage();
  if (typeof window === "undefined") return null;

  try {
    const bookingId = localStorage.getItem(
      DEMO_LAST_BOOKING_KEY
    );

    if (!bookingId) return null;

    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    const reservations = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(reservations)) return null;

    const matchingReservations = reservations.filter(
      (reservation) =>
        String(reservation.bookingId) === String(bookingId)
    );

    if (matchingReservations.length === 0) return null;

    const bookedTableIds = [
      ...new Set(
        matchingReservations.flatMap((reservation) =>
          normalizeTableIds(reservation.table)
        )
      ),
    ];

    return {
      id: bookingId,
      bookingId,
      eventId: "demo-event",
      table: bookedTableIds.join(", "),
      bookedTableIds,
      guests: matchingReservations[0].guests,
      name: matchingReservations[0].name,
      isDemo: true,
    };
  } catch (error) {
    console.error("Could not load demo booking:", error);
    return null;
  }
}

// === CANCEL BOOKING ===
function cancelDemoBooking(bookingId) {
  migrateDemoStorage();
  const stored = localStorage.getItem(DEMO_STORAGE_KEY);
  const reservations = stored ? JSON.parse(stored) : [];

  if (!Array.isArray(reservations)) {
    throw new Error("Invalid demo reservation data.");
  }

  const remainingReservations = reservations.filter(
    (reservation) =>
      String(reservation.bookingId) !== String(bookingId)
  );

  localStorage.setItem(
    DEMO_STORAGE_KEY,
    JSON.stringify(remainingReservations)
  );

  if (
    localStorage.getItem(DEMO_LAST_BOOKING_KEY) ===
    String(bookingId)
  ) {
    localStorage.removeItem(DEMO_LAST_BOOKING_KEY);
  }
}

// === BOOKING TABLES ===
function BookingTables({ eventId, selectedEvent }) {

  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const {
    selectedTableIds,
    toggleTable,
    resetTables,
  } = useBooking(eventId);

  const eventIsBookable = isEventBookable(selectedEvent);

  const {
    occupiedTableIds,
    loading,
    error,
    isLoaded,
    refreshReservations,
  } = useEventReservations(
    eventIsBookable ? eventId : ""
  );

  const [confirmedReservation, setConfirmedReservation] =
    useState(() => {
      if (typeof window === "undefined") return null;

      if (!selectedEvent?.isDemo) return null;

      return getLastDemoBooking();
    });

  const [confirmedTableIds, setConfirmedTableIds] =
    useState(() => {
      if (typeof window === "undefined") return [];

      if (!selectedEvent?.isDemo) return [];

      const booking = getLastDemoBooking();

      return booking?.bookedTableIds ?? [];
    });

  const [showCancelConfirmation, setShowCancelConfirmation] =
    useState(false);

  const [cancelError, setCancelError] = useState("");

  const activeReservation = isClient
    ? confirmedReservation
    : null;

  const bookedTableIds = isClient
    ? [
        ...new Set([
          ...confirmedTableIds,
          ...normalizeTableIds(
            activeReservation?.bookedTableIds
          ),
          ...normalizeTableIds(
            activeReservation?.table
          ),
        ]),
      ]
    : [];

  const tablesDisabled =
    !eventIsBookable ||
    !isLoaded ||
    loading ||
    Boolean(error) ||
    Boolean(activeReservation);

  // === BOOKING SUCCESS ===
  function handleBookingSuccess(reservation) {
    const newlyBookedTableIds = [...selectedTableIds];

    setConfirmedTableIds(newlyBookedTableIds);

    const confirmedBooking = {
      ...reservation,
      table: newlyBookedTableIds.join(", "),
      bookedTableIds: newlyBookedTableIds,
      isDemo: Boolean(selectedEvent?.isDemo),
    };

    setConfirmedReservation(confirmedBooking);

    resetTables();

    refreshReservations();
  }

  function handleCancelBooking() {
    if (!activeReservation?.isDemo) return;

    setCancelError("");

    try {
      cancelDemoBooking(activeReservation.bookingId);

      setConfirmedReservation(null);

      setConfirmedTableIds([]);

      setShowCancelConfirmation(false);

      refreshReservations();
    } catch (error) {
      console.error("Could not cancel booking:", error);

      setCancelError(
        "Your booking could not be cancelled. Please try again."
      );
    }
  }

  return (
    <div className="w-full">

      {selectedEvent?.isDemo && (
        <div className="mt-6 border border-white/20 p-4">
          <p className="text-sm font-medium text-white">
            Demo Mode
          </p>

          <p className="mt-2 text-sm text-gray-400">
            This is a demonstration event.
            No real reservation will be made.
          </p>
        </div>
      )}

      {selectedEvent && !eventIsBookable && (
        <div
          role="status"
          className="mt-6 border border-white/20 p-5"
        >
          <p className="font-medium text-white">
            This event is unavailable for booking.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            This event has already taken place or
            is not available for reservations.
            Please select another event.
          </p>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      <TableGrid
        selectedTableIds={selectedTableIds}
        occupiedTableIds={occupiedTableIds}
        bookedTableIds={bookedTableIds}
        onToggleTable={toggleTable}
        disabled={tablesDisabled}
      />

      {activeReservation && (
        <div className="mx-auto mt-12 max-w-2xl border-t border-white/20 pt-6">
          <h2 className="text-2xl font-medium uppercase">
            Your Booking
          </h2>

          <p className="mt-3 text-green-400">
            Booking Confirmed
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-300">
            <p>
              Event:{" "}
              <span className="text-white">
                {selectedEvent?.title}
              </span>
            </p>

            <p>
              Tables:{" "}
              <span className="text-white">
                {bookedTableIds.join(", ") || "—"}
              </span>
            </p>

            <p>
              Guests:{" "}
              <span className="text-white">
                {activeReservation.guests ?? "—"}
              </span>
            </p>

            {activeReservation.isDemo && (
              <p>
                Booking reference:{" "}
                <span className="text-white">
                  {activeReservation.bookingId}
                </span>
              </p>
            )}
          </div>

          {activeReservation.isDemo && (
            <div className="mt-8">
              {!showCancelConfirmation ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowCancelConfirmation(true)
                  }
                  className="border border-white px-6 py-3 text-sm font-medium uppercase text-white transition-colors hover:text-red-400"
                >
                  Cancel Booking
                </button>
              ) : (
                <div className="border border-white/20 p-5">
                  <p className="text-sm text-white">
                    Are you sure you want to cancel your booking?
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={handleCancelBooking}
                      className="border border-red-400 px-5 py-3 text-sm uppercase text-red-400 hover:bg-red-400 hover:text-black"
                    >
                      Yes, Cancel Booking
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShowCancelConfirmation(false)
                      }
                      className="border border-white/40 px-5 py-3 text-sm uppercase text-white"
                    >
                      Keep Booking
                    </button>
                  </div>
                </div>
              )}

              {cancelError && (
                <p
                  role="alert"
                  className="mt-4 text-sm text-red-400"
                >
                  {cancelError}
                </p>
              )}
            </div>
          )}
        </div>
      )}

{!activeReservation && (
  <div className="mt-16">
    <BookingForm
      selectedEvent={selectedEvent}
      selectedTableIds={selectedTableIds}
      occupiedTableIds={occupiedTableIds}
      bookingDisabled={
        !eventIsBookable ||
        !isLoaded ||
        loading ||
        Boolean(error)
      }
      onSuccess={handleBookingSuccess}
    />
  </div>
)}

    </div>
  );
}

// === EVENT SELECTION ===
function BookingContentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedEventId =
    searchParams.get("eventId") ?? "";

  const [events, setEvents] = useState([]);

  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const data = await getEvents(controller.signal);

        if (!Array.isArray(data)) {
          throw new Error("Invalid event data.");
        }

        if (controller.signal.aborted) return;

        setEvents(data);
        setEventsError("");
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Could not load events:", error);

        setEventsError("Could not load events.");
      } finally {
        if (!controller.signal.aborted) {
          setEventsLoading(false);
        }
      }
    }

    loadEvents();

    return () => controller.abort();
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(
      a.doorsOpen ?? a.date ?? 0
    ).getTime();

    const dateB = new Date(
      b.doorsOpen ?? b.date ?? 0
    ).getTime();

    return dateB - dateA;
  });

  const upcomingEvents = sortedEvents.filter(
    (event) => isEventBookable(event)
  );

  const demoEvent = createDemoEvent();

  const availableEvents = [
    demoEvent,
    ...sortedEvents,
  ];

  const defaultEvent =
    upcomingEvents.length > 0
      ? [...upcomingEvents].sort(
          (a, b) =>
            new Date(a.doorsOpen ?? a.date) -
            new Date(b.doorsOpen ?? b.date)
        )[0]
      : demoEvent;

  const selectedEvent = selectedEventId
    ? availableEvents.find(
        (event) =>
          String(event.id) === selectedEventId
      )
    : defaultEvent;

  const activeEventId = selectedEvent
    ? String(selectedEvent.id)
    : "";

  function handleEventChange(eventId) {
    if (eventId) {
      router.push(
        `/booking?eventId=${encodeURIComponent(eventId)}`
      );
    } else {
      router.push("/booking");
    }
  }

  return (
    <div className="w-full pb-24">

      <EventSelector
        events={eventsLoading ? [] : availableEvents}
        selectedEventId={activeEventId}
        onEventChange={handleEventChange}
        loading={eventsLoading}
        error={eventsError}
      />

      {selectedEventId &&
        !eventsLoading &&
        !eventsError &&
        !selectedEvent && (
          <p
            role="alert"
            className="mt-6 text-sm text-red-400"
          >
            This event is unavailable for booking.
          </p>
        )}

      {!eventsLoading &&
        !eventsError &&
        selectedEvent && (
          <BookingTables
            key={activeEventId}
            eventId={activeEventId}
            selectedEvent={selectedEvent}
          />
        )}
    </div>
  );
}

export default function BookingContent() {
  return (
    <Suspense
      fallback={
        <p className="py-12 text-center text-gray-400">
          Loading booking...
        </p>
      }
    >
      <BookingContentInner />
    </Suspense>
  );
}
