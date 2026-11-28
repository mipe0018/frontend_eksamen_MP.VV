
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const EVENTS_PER_PAGE = 3;
const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

export default function EventList({ events = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const isInitialRender = useRef(true);

  // Scroller til headeren, når brugeren skifter side
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const header = document.querySelector("header");

    if (header) {
      header.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  // Skifter side
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Beregner pagination
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

  const currentEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  // Formaterer dato og tidspunkt
  function formatEventDateTime(date) {
    if (!date) return "";

    const eventDate = new Date(date);

    if (Number.isNaN(eventDate.getTime())) return "";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Copenhagen",
    }).format(eventDate);
  }

  return (
    <section className="w-full">
      <div className="w-full">
        {currentEvents.map((event, index) => {
          const imageUrl = event.asset?.url
            ? new URL(event.asset.url, API_URL).toString()
            : null;

          return (
            <article
              key={event.id}
              className={`flex flex-col min-[800px]:flex-row ${
                index % 2 !== 0
                  ? "min-[800px]:flex-row-reverse"
                  : ""
              }`}
            >
              {/* Event image */}
              <div className="relative aspect-[960/530] w-full min-[800px]:w-1/2">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={event.asset?.alt || event.title}
                    fill
                    priority={currentPage === 1 && index === 0}
                    sizes="(max-width: 799px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-neutral-900">
                    <p className="text-sm text-gray-400">
                      Image unavailable
                    </p>
                  </div>
                )}
              </div>

              {/* Event information */}
              <div className="flex w-full flex-col justify-between bg-black px-[15px] py-8 text-white min-[800px]:w-1/2 min-[800px]:px-10 min-[800px]:py-7">
                <div>
                  <h2 className="mb-3 text-base font-bold uppercase leading-tight">
                    {event.title}
                  </h2>

                  <p className="mb-4 text-xs font-medium uppercase">
                    <span className="font-bold text-[oklch(65.3%_0.243_9.4)]">
                      {formatEventDateTime(
                        event.doorsOpen || event.date
                      )}
                    </span>

                    <span className="mx-2 text-white">|</span>

                    <span className="text-white">
                      {event.location}
                    </span>
                  </p>

                  <p className="text-xs leading-relaxed text-gray-300">
                    {event.excerpt}
                  </p>
                </div>

                {/* Read More button */}
                <div className="mt-8 flex justify-center min-[800px]:justify-end min-[800px]:pr-4">
                  <Link
                    href={`/events/${event.slug}`}
                    className="border-y border-white px-6 py-2 text-center text-xs font-bold uppercase text-white transition hover:border-[oklch(65.3%_0.243_9.4)] hover:text-[oklch(65.3%_0.243_9.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
          className="flex min-h-[130px] w-full items-center justify-center gap-6 bg-black text-white"
        >
          {/* Previous button - vises ikke på første side */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-sm font-bold transition hover:text-[oklch(65.3%_0.243_9.4)]"
            >
              previous
            </button>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              aria-current={
                currentPage === index + 1 ? "page" : undefined
              }
              className={`text-sm font-bold transition ${
                currentPage === index + 1
                  ? "text-[oklch(65.3%_0.243_9.4)]"
                  : "text-white hover:text-[oklch(65.3%_0.243_9.4)]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button - vises ikke på sidste side */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-sm font-bold transition hover:text-[oklch(65.3%_0.243_9.4)]"
            >
              next
            </button>
          )}
        </nav>
      )}
    </section>
  );
}
