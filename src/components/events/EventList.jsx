
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// API-adresse
const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

// Antal events pr. side
const EVENTS_PER_PAGE = 3;

// Figma-billeder til de tre første events
import blogFull1 from "../../assets/event/blog_full1.jpg";
import blogFull2 from "../../assets/event/blog_full2.jpg";
import blogCenter3 from "../../assets/event/blog_center3.jpg";

const LOCAL_EVENT_IMAGES = {
  "neon-nights-grand-opening": blogFull1,
  "retro-rewind-80s-90s": blogFull2,
  "bass-drop-dubstep-edition": blogCenter3,
};

export default function EventList({ events }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Beregn det samlede antal sider
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  // Beregn hvilket event der skal vises først
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

  // Udvælg de tre events til den aktuelle side
  const currentEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  // Formater datoen
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }

  // Formater tidspunktet
  function formatTime(date) {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  return (
    <div className="w-full">

      {/* Eventliste */}
      <div>
        {currentEvents.map((event, index) => {

          // Brug lokalt Figma-billede, hvis det findes.
          // Ellers hentes billedet fra API'et.
          const imageSrc =
            LOCAL_EVENT_IMAGES[event.slug] ||
            (event.asset?.url
              ? event.asset.url.startsWith("http")
                ? event.asset.url
                : `${API_URL}${event.asset.url}`
              : null);

          return (
            <article
              key={event.id}
              className={`grid grid-cols-1 min-[800px]:grid-cols-2 ${
                index % 2 !== 0 ? "min-[800px]:[&>*:first-child]:order-2" : ""
              }`}
            >

              {/* Eventbillede */}
              <div className="relative w-full aspect-[960/530] overflow-hidden">

                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={event.asset?.alt || event.title}
                    fill
                    sizes="(max-width: 799px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-neutral-900 text-white">
                    Image unavailable
                  </div>
                )}

              </div>

              {/* Eventinformation */}
              <div className="flex flex-col justify-between bg-black text-white p-6 min-[800px]:p-10">

                <div>

                  {/* Eventtitel */}
                  <h2 className="text-sm font-bold uppercase mb-3">
                    {event.title}
                  </h2>

                  {/* Dato, tidspunkt og sted */}
                  <p className="text-[10px] mb-4 uppercase">

                    <span className="text-[#FF2A70] font-bold">
                      {formatDate(event.date)} · {formatTime(event.date)}
                    </span>

                    <span className="mx-2 text-white">|</span>

                    <span className="text-white">
                      {event.location}
                    </span>

                  </p>

                  {/* Eventbeskrivelse */}
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {event.excerpt}
                  </p>

                </div>

                {/* Read More */}
               

<div className="flex justify-end mt-8 min-[800px]:mt-0 min-[800px]:pt-8">
  <Link
    href={`/events/${event.slug}`}
    className="inline-flex justify-center items-center border-y border-white py-2 px-6 text-[10px] font-bold uppercase text-white hover:text-[#FF2A70] hover:border-[#FF2A70] transition-colors duration-300"
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
          className="flex justify-center items-center gap-4 py-16 text-white"
        >

          {/* Sidetal */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index + 1)}
              aria-current={
                currentPage === index + 1 ? "page" : undefined
              }
              className={`text-sm font-bold transition-colors duration-300 ${
                currentPage === index + 1
                  ? "text-[#FF2A70] underline underline-offset-4"
                  : "text-white hover:text-[#FF2A70]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Næste side */}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-sm font-bold text-white hover:text-[#FF2A70] transition-colors duration-300"
            >
              NÆSTE &gt;
            </button>
          )}

        </nav>
      )}

    </div>
  );
}
