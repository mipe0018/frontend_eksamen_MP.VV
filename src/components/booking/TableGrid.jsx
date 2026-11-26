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

  return (
    <section className="w-full pt-12">

      <div className="flex justify-end">
        <div
          className="
            flex flex-wrap items-center justify-end
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

      <div className="grid grid-cols-5 gap-x-4 gap-y-10 pt-10 pb-10">
        {tables.map((table) => {
          const id = Number(table.id);

          const isBookedByUser = bookedIds.includes(id);
          const isOccupied = occupiedIds.includes(id);
          const isSelected = selectedIds.includes(id);

          return (
            <TableCard
              key={table.id}
              table={table}
              isSelected={isSelected}
              isOccupied={isOccupied}
              isBookedByUser={isBookedByUser}
              disabled={disabled || hasBooking}
              onToggle={handleToggleTable}
            />
          );
        })}
      </div>

      <p className="mt-4 text-center text-sm text-gray-300">
        {hasBooking ? "Your booked tables:" : "Selected tables:"}{" "}
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
