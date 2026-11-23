
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Lokale billeder fra Figma
import neonNightsImage from "../../assets/event/blog_full1.jpg";
import retroRewindImage from "../../assets/event/blog_full2.jpg";
import bassDropImage from "../../assets/event/blog_center3.jpg";

const EVENTS_PER_PAGE = 3;

const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

// Indholdet på første side følger Figma-designet
const FIGMA_EVENTS = [
  {
    slug: "neon-nights-grand-opening",
    title: "Neon Nights Grand Opening",
    dateText: "May 9",
    timeText: "21:00",
    location: "Center Stage",
    excerpt:
      "Night Club opens its doors again with an evening of house, visuals, and live percussion on the main stage. Guests can expect welcome drinks from 21:00, an upgraded lighting setup, and a program that builds toward a big countdown show at midnight.",
    image: neonNightsImage,
    imageAlt: "DJ playing records under red stage lighting",
  },
  {
    slug: "retro-rewind-80s-90s",
    title: "Retro Rewind: 80s & 90s",
    dateText: "May 16",
    timeText: "21:00",
    location: "Center Stage",
    excerpt:
      "A full evening dedicated to classic floorfillers from the 80s and 90s. The DJ team mixes pop, disco, and old school R&B while the bar serves signature cocktails inspired by the biggest club hits of the era.",
    image: retroRewindImage,
    imageAlt: "DJ performing with purple stage lights",
  },
  {
    slug: "bass-drop-dubstep-edition",
    title: "Bass Drop: Dubstep Edition",
    dateText: "May 22",
    timeText: "21:00",
    location: "Center Stage",
    excerpt:
      "Friday's program pushes tempo and sub-bass all the way up with guest DJs, an MC host, and a crowd that comes for heavy drops and a dark club atmosphere. The night is aimed at guests who want to get close to the stage and feel the sound physically.",
    image: bassDropImage,
    imageAlt: "Performer on stage under blue lighting",
  },
];

export default function EventList({ events = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Find de tre events fra Figma i API-dataene.
  // API'et leverer stadig eventets id og slug til navigationen.
  const figmaEvents = FIGMA_EVENTS.map((figmaEvent) => {
    const apiEvent = events.find(
      (event) => event.slug === figmaEvent.slug
    );

    if (!apiEvent) {
      return null;
    }

    return {
      ...apiEvent,
      ...figmaEvent,
    };
  }).filter(Boolean);

  // Fjern de tre Figma-events fra resten af API-listen.
  const remainingEvents = events.filter(
    (event) =>
      !FIGMA_EVENTS.some(
        (figmaEvent) => figmaEvent.slug === event.slug
      )
  );

  // Første side bruger Figma-indholdet.
  // De efterfølgende sider bruger resten af API-dataene.
  const allDisplayEvents = [...figmaEvents, ...remainingEvents];

  // Beregn antal sider.
  const totalPages = Math.ceil(
    allDisplayEvents.length / EVENTS_PER_PAGE
  );

  // Udvælg events til den aktuelle side.
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;

  const currentEvents = allDisplayEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  return (
    <section className="w-full">
      {/* Eventliste */}
      <div className="w-full">
        {currentEvents.map((event, index) => {
          const isFigmaEvent = currentPage === 1;

          return (
            <article
              key={event.id}
              className={`flex flex-col min-[800px]:flex-row ${
                index % 2 !== 0
                  ? "min-[800px]:flex-row-reverse"
                  : ""
              }`}
            >
              {/* Eventbillede */}
              <div className="relative w-full aspect-[960/530] min-[800px]:w-1/2 min-[800px]:aspect-[960/530]">
                {isFigmaEvent && event.image ? (
                  <Image
                    src={event.image}
                    alt={event.imageAlt || event.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 799px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : event.asset?.url ? (
                  <Image
                    src={`${API_URL}${event.asset.url}`}
                    alt={event.asset.alt || event.title}
                    fill
                    sizes="(max-width: 799px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : null}
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
                    <span className="font-bold text-[#FF2A70]">
                      {isFigmaEvent
                        ? `${event.dateText} · ${event.timeText}`
                        : `${new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(event.date))} · ${new Intl.DateTimeFormat(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          ).format(new Date(event.date))}`}
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
                    className="border-y border-white px-6 py-2 text-center text-xs font-bold uppercase text-white transition hover:border-[#FF2A70] hover:text-[#FF2A70]"
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
      <nav
        aria-label="Event pages"
        className="flex min-h-[130px] items-center justify-center gap-4 bg-black text-white"
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            aria-current={
              currentPage === index + 1 ? "page" : undefined
            }
            className={`text-sm font-bold transition ${
              currentPage === index + 1
                ? "text-[#FF2A70]"
                : "text-white hover:text-[#FF2A70]"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-sm font-bold text-white transition hover:text-[#FF2A70]"
          >
            næste &gt;
          </button>
        )}
      </nav>
    </section>
  );
}
