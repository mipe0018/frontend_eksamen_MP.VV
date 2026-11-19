"use client";

import { useState } from "react";
import { DEMO_STORAGE_KEY, DEMO_LAST_BOOKING_KEY, migrateDemoStorage } from "@/lib/demoStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema } from "@/lib/validations/bookingSchema";

import {
  createReservation,
  getEventReservations,
} from "@/lib/bookingApi";

import { tables } from "@/data/tables";

const DEMO_RESERVED_TABLES = [3, 8, 13];

// === DEMO RESERVATIONS ===
function getDemoReservations() {
  migrateDemoStorage();
  const stored = localStorage.getItem(DEMO_STORAGE_KEY);

  if (!stored) return [];

  const reservations = JSON.parse(stored);

  if (!Array.isArray(reservations)) {
    throw new Error("Invalid demo reservation data.");
  }

  return reservations;
}

// === SAVE DEMO BOOKING ===
function saveDemoBooking({
  selectedEvent,
  selectedTableIds,
  data,
  eventDate,
}) {
  const currentReservations = getDemoReservations();

  const reservedTables = [
    ...DEMO_RESERVED_TABLES,
    ...currentReservations.map((reservation) =>
      Number(reservation.table)
    ),
  ];

  const alreadyReserved = selectedTableIds.some(
    (tableId) =>
      reservedTables.includes(Number(tableId))
  );

  if (alreadyReserved) {
    throw new Error("TABLE_ALREADY_RESERVED");
  }

  const bookingId = crypto.randomUUID();

  const newReservations = selectedTableIds.map(
    (tableId) => ({
      id: crypto.randomUUID(),
      bookingId,
      eventId: selectedEvent.id,

      name: data.name.trim(),
      email: data.email.trim(),

      phone: "",

      guests: String(data.guests),
      table: String(tableId),
      date: eventDate,

      comment: data.comment?.trim() ?? "",

      isDemo: true,
    })
  );

  localStorage.setItem(
    DEMO_STORAGE_KEY,
    JSON.stringify([
      ...currentReservations,
      ...newReservations,
    ])
  );

  localStorage.setItem(
    DEMO_LAST_BOOKING_KEY,
    bookingId
  );

  return {
    id: bookingId,
    bookingId,
    eventId: selectedEvent.id,
    table: selectedTableIds.join(", "),
    guests: String(data.guests),
    comment: data.comment?.trim() ?? "",
    isDemo: true,
  };
}

// === BOOKING FORM ===
export default function BookingForm({
  selectedEvent,
  selectedTableIds = [],
  occupiedTableIds = [],

  bookingDisabled = false,

  onSuccess,
}) {

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isDemo = selectedEvent?.isDemo === true;

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      name: "",
      email: "",
      guests: "",
      comment: "",
    },
  });

  const inputClass = `
    w-full min-w-0
    border border-white/30
    bg-transparent
    px-4 py-4
    text-sm text-white
    outline-none
    transition-colors duration-200
    placeholder:text-gray-400
    focus:border-white
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const selectedTables = tables.filter((table) =>
    selectedTableIds.some(
      (id) => Number(id) === Number(table.id)
    )
  );

  const totalCapacity = selectedTables.reduce(
    (total, table) =>
      total + Number(table.capacity),
    0
  );

  const hasOccupiedTable = selectedTableIds.some(
    (tableId) =>
      occupiedTableIds.some(
        (id) => Number(id) === Number(tableId)
      )
  );

  const validTableCount = isDemo
    ? selectedTableIds.length > 0
    : selectedTableIds.length === 1;

  const canSubmit =
    !bookingDisabled &&
    Boolean(selectedEvent) &&
    validTableCount &&
    selectedTables.length === selectedTableIds.length &&
    !hasOccupiedTable;

  // === SUBMIT BOOKING ===
  async function onSubmit(data) {
    setStatus("idle");
    setErrorMessage("");

    if (!canSubmit) {
      setStatus("error");

      setErrorMessage(
        bookingDisabled
          ? "Booking is currently unavailable."
          : isDemo
            ? "Please select at least one available table."
            : "Please select one available table."
      );

      return;
    }

    if (
      Number(data.guests) < 1 ||
      Number(data.guests) > totalCapacity
    ) {
      setStatus("error");

      setErrorMessage(
        `Your selected tables accommodate up to ${totalCapacity} guests.`
      );

      return;
    }

    const eventDate =
      selectedEvent.doorsOpen ?? selectedEvent.date;

    if (
      !isDemo &&
      (
        !eventDate ||
        Number.isNaN(Date.parse(eventDate)) ||
        new Date(eventDate) <= new Date()
      )
    ) {
      setStatus("error");

      setErrorMessage(
        "This event is no longer available for booking."
      );

      return;
    }

    try {
      let reservation;

      if (isDemo) {
        reservation = saveDemoBooking({
          selectedEvent,
          selectedTableIds,
          data,
          eventDate,
        });
      } else {

        const currentReservations =
          await getEventReservations(selectedEvent.id);

        if (!Array.isArray(currentReservations)) {
          throw new Error("Invalid reservation data.");
        }

        const isReserved = currentReservations.some(
          (item) =>
            String(item.table) ===
            String(selectedTableIds[0])
        );

        if (isReserved) {
          throw new Error("TABLE_ALREADY_RESERVED");
        }

        reservation = await createReservation({
          name: data.name.trim(),
          email: data.email.trim(),

          phone: "",

          guests: String(data.guests),
          table: String(selectedTableIds[0]),
          date: eventDate,
          eventId: selectedEvent.id,
        });
      }

      reset();
      setStatus("success");

      onSuccess?.(reservation);
    } catch (error) {
      console.error("Booking failed:", error);

      setStatus("error");

      setErrorMessage(
        error.message === "TABLE_ALREADY_RESERVED"
          ? "This table has just been reserved. Please choose another."
          : "Your reservation could not be completed. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto flex w-full max-w-2xl flex-col gap-4"
    >

      <h2 className="mb-4 text-2xl font-semibold uppercase">
        Book a Table
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-name"
            className="sr-only"
          >
            Your Name
          </label>

          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
            className={inputClass}
          />

          {errors.name && (
            <p className="text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-email"
            className="sr-only"
          >
            Your Email
          </label>

          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            placeholder="Your Email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
            className={inputClass}
          />

          {errors.email && (
            <p className="text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-tables"
            className="sr-only"
          >
            Table Number
          </label>

          <input
            id="booking-tables"
            type="text"
            value={selectedTableIds.join(", ")}
            placeholder="Table Number"
            readOnly
            className={`${inputClass} cursor-default`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-guests"
            className="sr-only"
          >
            Number of Guests
          </label>

          <input
            id="booking-guests"
            type="number"
            min="1"
            max={totalCapacity || undefined}
            placeholder="Number of Guests"
            aria-invalid={Boolean(errors.guests)}
            {...register("guests")}
            className={inputClass}
          />

          {errors.guests && (
            <p className="text-xs text-red-400">
              {errors.guests.message}
            </p>
          )}

          {totalCapacity > 0 && (
            <p className="text-xs text-gray-400">
              Maximum {totalCapacity} guests
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="booking-event"
            className="sr-only"
          >
            Selected Event
          </label>

          <input
            id="booking-event"
            type="text"
            value={selectedEvent?.title ?? ""}
            placeholder="Choose Night"
            readOnly
            className={`${inputClass} cursor-default`}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="booking-comment"
            className="sr-only"
          >
            Your Comment (Optional)
          </label>

          <textarea
            id="booking-comment"
            rows={7}
            placeholder="Your Comment (Optional)"
            aria-invalid={Boolean(errors.comment)}
            {...register("comment")}
            className={`${inputClass} min-h-40 resize-y`}
          />

          {errors.comment && (
            <p className="text-xs text-red-400">
              {errors.comment.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p
          role="alert"
          className="text-sm text-red-400"
        >
          {errorMessage}
        </p>
      )}

      {!bookingDisabled && selectedTableIds.length === 0 && (
        <p className="text-sm text-gray-400">
          Please select a table above to complete your booking.
        </p>
      )}

      <div className="mt-1 flex w-full justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className="
            min-w-28
            border-y border-white
            px-7 py-3
            text-xs font-medium uppercase
            tracking-wide text-white
            transition-colors duration-200
            hover:bg-white hover:text-black
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          {isSubmitting ? "Reserving..." : "Reserve"}
        </button>
      </div>
    </form>
  );
}
