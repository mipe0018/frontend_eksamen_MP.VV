import Image from "next/image";

// === TABLE CARD ===
export default function TableCard({
  table,
  isSelected = false,
  isOccupied = false,
  isBookedByUser = false,
  disabled = false,
  onToggle,
}) {

  const isDisabled =
    disabled || isOccupied || isBookedByUser;

  const status = isBookedByUser
    ? "Your Booking"
    : isOccupied
      ? "Reserved"
      : disabled
        ? "Unavailable"
        : isSelected
          ? "Selected"
          : "Available";

  const cardStyle = isBookedByUser
    ? "cursor-default opacity-100"
    : isDisabled
      ? "cursor-not-allowed opacity-40"
      : "cursor-pointer hover:scale-105";

  const imageStyle =
    isBookedByUser || (isSelected && !isDisabled)
      ? "scale-[1.03] ring-2 ring-white/70"
      : "";

  const statusColor = isBookedByUser
    ? "text-white"
    : isDisabled
      ? "text-gray-400"
      : isSelected
        ? "text-white"
        : "text-green-400";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onToggle?.(table.id)}
      aria-pressed={isSelected && !isDisabled}
      aria-label={`Table ${table.id}, ${table.capacity} guests, ${status}`}
      className={`
        group relative mx-auto flex w-full max-w-40
        flex-col items-center gap-3 rounded-lg p-2
        transition-all duration-200

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white

        ${cardStyle}
      `}
    >

      <div
        className={`
          relative w-full rounded-lg
          transition-all duration-200
          ${imageStyle}
        `}
      >
        <Image
          src={table.image}
          alt=""
          className="h-auto w-full"
        />

        <span
          className="
            pointer-events-none absolute inset-0
            flex items-center justify-center
            text-2xl font-medium text-white
          "
        >
          {table.id}
        </span>
      </div>

      <span
        className={`
          text-xs font-medium
          transition-colors duration-200
          ${statusColor}
        `}
      >
        {status}
      </span>
    </button>
  );
}
