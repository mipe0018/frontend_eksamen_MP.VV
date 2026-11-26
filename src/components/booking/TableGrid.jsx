"use client";

import { tables } from "@/data/tables";
import TableCard from "./TableCard.jsx";

// === TABLE GRID ===
export default function TableGrid({
  selectedTableIds = [],
  occupiedTableIds = [],
  bookedTableIds = [],
  onToggleTable,
  disabled = false,
}) {
  const selectedIds = selectedTableIds.map(Number);
  const occupiedIds = occupiedTableIds.map(Number);
  const bookedIds = bookedTableIds.map(Number);

  const hasBooking = bookedIds.length > 0;

  // === TABLE SELECTION ===

  function handleToggleTable(tableId) {
    const id = Number(tableId);

    if (disabled || hasBooking) return;

    if (occupiedIds.includes(id)) return;

    onToggleTable?.(tableId);
  }

  // === SHARED TABLE CARD ===
  // Reuse the same table logic on desktop and mobile.

  function renderTable(table) {
    const id = Number(table.id);

    return (
      <TableCard
        key={table.id}
        table={table}
        isSelected={selectedIds.includes(id)}
        isOccupied={occupiedIds.includes(id)}
        isBookedByUser={bookedIds.includes(id)}
        disabled={disabled || hasBooking}
        onToggle={handleToggleTable}
      />
    );
  }

  // === MOBILE TABLE GROUPS ===
  // Preserve the original table positions.

  const mobileGroups = [
    [1, 2, 6, 7, 11, 12],
    [3, 4, 8, 9, 13, 14],
    [5, 10, 15],
  ];

  return (
    <section className="w-full min-w-0 pt-12">

      {/* === TABLE AVAILABILITY LEGEND === */}

      <div className="flex justify-center md:justify-end">
        <div
          className="
            flex flex-wrap items-center
            justify-center md:justify-end
            gap-x-5 gap-y-2
            text-xs text-gray-300
          "
          aria-label="Table availability legend"
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[2px] border border-gray-400" />
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[2px] border-2 border-white" />
            <span>Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[2px] bg-gray-600" />
            <span>Reserved</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[2px] border-2 border-white" />
            <span>Your Booking</span>
          </div>
        </div>
      </div>

      {/* === DESKTOP TABLE GRID === */}
      {/* Original desktop layout */}

      <div
        className="
          hidden
          md:grid
          grid-cols-5
          gap-x-4 gap-y-10
          pt-10 pb-10
        "
      >
        {tables.map(renderTable)}
      </div>

      {/* === MOBILE TABLE GRID === */}

      <div className="w-full min-w-0 md:hidden">

        {/* Swipe instructions */}

        <div className="flex items-center justify-center gap-3 pt-8 pb-4">
          <span className="text-gray-400">←</span>

          <p className="text-xs text-gray-400">
            Swipe to explore all tables
          </p>

          <span className="text-gray-400">→</span>
        </div>

        {/* Horizontal swipe container */}

        <div
          className="
            flex w-full min-w-0
            overflow-x-auto
            snap-x snap-mandatory
            overscroll-x-contain
            pb-6
          "
        >
          {mobileGroups.map((group, index) => (
            <div
              key={index}
              className="
                w-full min-w-full shrink-0
                snap-start
                px-2
              "
            >

              {/* Two columns per mobile page */}

              <div
                className={`
                  grid
                  ${group.length === 3
                    ? "grid-cols-1"
                    : "grid-cols-2"}
                  gap-x-4 gap-y-6
                  py-4
                `}
              >
                {group.map((tableId) => {
                  const table = tables.find(
                    (item) => Number(item.id) === tableId
                  );

                  return table
                    ? renderTable(table)
                    : null;
                })}
              </div>

              {/* Page indicator */}

              <p className="mt-4 text-center text-xs text-gray-400">
                {index + 1} / {mobileGroups.length}
              </p>

            </div>
          ))}
        </div>
      </div>

      {/* === SELECTED / BOOKED TABLES === */}

      <p className="mt-4 text-center text-sm text-gray-300">
        {hasBooking
          ? "Your booked tables:"
          : "Selected tables:"}{" "}

        <span className="font-medium text-white">
          {hasBooking
            ? bookedIds.join(", ")
            : selectedIds.length > 0
              ? selectedIds.join(", ")
              : "None"}
        </span>
      </p>

    </section>
  );
}