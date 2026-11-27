
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EVENTS_PER_PAGE = 3;

const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

// Formater eventets dato fra API'et
function formatEventDate(date) {
  const eventDate = new Date(date);

  if (Number.isNaN(eventDate.getTime())) {
    return "Dato ikke tilgængelig";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(eventDate);
}

// Formater eventets starttidspunkt fra API'et
function formatEventTime(date) {
  const eventDate = new Date(date);

  if (Number.isNaN(eventDate.getTime())) {
    return "Tidspunkt ikke tilgængeligt";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  }).format(eventDate);
}

// Håndter både relative og absolutte billedstier fra API'et
function getEventImageUrl(imageUrl) {
  if (!imageUrl) return null;

  return new URL(imageUrl, API_URL).toString();
}

export default function EventList({ events = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Beregn antal sider
  const totalPages = Math.ceil(
    events.length / EVENTS_PER_PAGE
  );

  // Udvælg events til den aktuelle side
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

  const currentEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  return (
    <section className="w-full">

      {/* Eventliste */}
      <div className="w-full">
        {currentEvents.map((event, index) => {
          const imageUrl = getEventImageUrl(event.asset?.url);

          return (
            <article
              key={event.id ?? event.slug}
              className={`flex flex-col min-[800px]:flex-row ${
                index % 2 !== 0
                  ? "min-[800px]:flex-row-reverse"
                  : ""
              }`}
            >

              {/* Eventbillede */}
              <div className="relative w-full aspect-[960/530] min-[800px]:w-1/2 min-[800px]:aspect-[960/530]">

                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={event.asset?.alt || event.title || "Eventbillede"}
                    fill
                    priority={currentPage === 1 && index === 0}
                    sizes="(max-width: 799px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-neutral-900 text-white">
                    Billede ikke tilgængeligt
                  </div>
                )}

              </div>

              {/* Eventinformation */}
              <div className="flex w-full min-[800px]:w-1/2 flex-col justify-between bg-black text-white px-[15px] py-8 min-[800px]:px-10 min-[800px]:py-7">

                <div>

                  {/* Eventtitel */}
                  <h2 className="mb-3 text-base font-bold uppercase leading-tight">
                    {event.title}
                  </h2>

                  {/* Dato, tidspunkt og lokation */}
                  <p className="mb-4 text-xs font-medium uppercase">

                    <span className="font-bold text-[oklch(65.3%_0.243_9.4)]">
                      {formatEventDate(event.date)} ·{" "}
                      {formatEventTime(event.date)}
                    </span>

                    <span className="mx-2 text-white">|</span>

                    <span className="text-white">
                      {event.location}
                    </span>

                  </p>

                  {/* Eventbeskrivelse */}
                  <p className="text-xs leading-relaxed text-gray-300">
                    {event.excerpt}
                  </p>

                </div>

                {/* Read More */}
                <div className="mt-8 flex justify-center min-[800px]:justify-end min-[800px]:pr-4">

                  <Link
                    href={`/events/${event.slug}`}
                    className="border-y border-white px-6 py-2 text-center text-xs font-bold uppercase text-white transition hover:border-[oklch(65.3%_0.243_9.4)] hover:text-[oklch(65.3%_0.243_9.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(65.3%_0.243_9.4)]"
                  >
                    Read More
                  </Link>

                </div>

              </div>

            </article>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Event pages"
          className="flex min-h-[130px] items-center justify-center gap-4 bg-black text-white"
        >

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index + 1)}
              aria-current={
                currentPage === index + 1 ? "page" : undefined
              }
              className={`text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(65.3%_0.243_9.4)] ${
                currentPage === index + 1
                  ? "text-[oklch(65.3%_0.243_9.4)]"
                  : "text-white hover:text-[oklch(65.3%_0.243_9.4)]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-sm font-bold text-white transition hover:text-[oklch(65.3%_0.243_9.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(65.3%_0.243_9.4)]"
            >
              næste &gt;
            </button>
          )}

        </nav>
      )}

    </section>
  );
}
