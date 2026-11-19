"use client";

// === EVENT SELECTOR ===
export default function EventSelector({
  events = [],
  selectedEventId = "",
  onEventChange,
  loading = false,
  error = "",
}) {

  function isPastEvent(event) {
    if (event.isDemo) return false;

    const eventDate = event.doorsOpen ?? event.date;

    if (!eventDate || Number.isNaN(Date.parse(eventDate))) {
      return true;
    }

    return new Date(eventDate) <= new Date();
  }

  return (
    <div className="w-full">

      <label
        htmlFor="booking-event"
        className="mb-3 block text-sm font-medium text-white"
      >
        Select an Event
      </label>

      <div className="relative">
        <select
          id="booking-event"
          value={selectedEventId}
          onChange={(event) =>
            onEventChange?.(event.target.value)
          }
          disabled={
            loading ||
            Boolean(error) ||
            events.length === 0
          }
          className="
            w-full appearance-none rounded-lg
            border border-white/20 bg-neutral-900
            py-4 pl-4 pr-14 text-white
            outline-none transition-colors
            focus:border-white/70
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          
          <option value="">
            {loading
              ? "Loading events..."
              : "Choose an event"}
          </option>

          {events.map((event) => {
            const unavailable = isPastEvent(event);

            return (
              <option
                key={event.id}
                value={String(event.id)}
              >
                {event.title}
                {unavailable ? " (Unavailable)" : ""}
              </option>
            );
          })}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="
            pointer-events-none absolute
            right-4 top-1/2
            -translate-y-1/2
            text-white/70
          "
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        events.length > 0 &&
        !selectedEventId && (
          <p className="mt-3 text-sm text-gray-400">
            Please select an event to view table availability.
          </p>
        )}
    </div>
  );
}
