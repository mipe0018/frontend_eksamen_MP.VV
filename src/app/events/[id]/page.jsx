import Link from "next/link";
import Image from "next/image";
import PageHero from "../../../components/global/PageHero.jsx";

const baseUrl =
  "https://backend-eksamen-mp-vv.onrender.com";

// === EVENT DETAILS PAGE ===

export default async function EventDetails({ params }) {
  const { id } = await params;

  // === FETCH EVENT DATA ===

  const response = await fetch(`${baseUrl}/events/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente eventet");
  }

  const event = await response.json();

  // === FORMAT DATE AND TIME ===

  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Copenhagen",
  });

  const eventTime = new Date(event.date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });

  const doorsOpen = new Date(event.doorsOpen).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });

  return (
    <main>

      {/* === PAGE HERO === */}

      <PageHero title={event.title} showLine />

      <article className="container-content py-10 text-white md:py-14">

        {/* === EVENT IMAGE === */}

        {event.heroAsset?.url && (
          <figure className="relative mb-10 aspect-[1170/500] overflow-hidden">
            <Image
              src={`${baseUrl}${event.heroAsset.url}`}
              alt={event.heroAsset.alt || event.title}
              fill
              sizes="(max-width: 768px) 90vw, 1440px"
              className="object-cover"
            />
          </figure>
        )}

        {/* === PRIMARY EVENT INFORMATION === */}

        <section
          aria-label="Event information"
          className="border-b border-white/20 pb-10"
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">

            {/* Date */}

            <div>
              <dt className="mb-2 text-xs uppercase tracking-widest text-gray-400">
                Date
              </dt>

              <dd className="text-base font-medium md:text-lg">
                <time dateTime={event.date}>
                  {eventDate}
                </time>
              </dd>
            </div>

            {/* Time */}

            <div>
              <dt className="mb-2 text-xs uppercase tracking-widest text-gray-400">
                Time
              </dt>

              <dd className="text-base font-medium md:text-lg">
                <time dateTime={event.date}>
                  {eventTime}
                </time>
              </dd>
            </div>

            {/* Doors open */}

            <div>
              <dt className="mb-2 text-xs uppercase tracking-widest text-gray-400">
                Doors Open
              </dt>

              <dd className="text-base font-medium md:text-lg">
                <time dateTime={event.doorsOpen}>
                  {doorsOpen}
                </time>
              </dd>
            </div>

            {/* Location */}

            <div>
              <dt className="mb-2 text-xs uppercase tracking-widest text-gray-400">
                Location
              </dt>

              <dd className="text-base font-medium md:text-lg">
                {event.location}
              </dd>
            </div>

          </dl>
        </section>

        {/* === EVENT PROGRAM AND BOOKING === */}

        <section
          aria-label="Event program and booking"
          className="
            grid grid-cols-1
            gap-10 py-10
            lg:grid-cols-3
            lg:gap-12 lg:py-14
          "
        >

          {/* === EVENT PROGRAM === */}

          <section
            aria-label="Event program"
            className="
              grid grid-cols-1
              gap-10
              sm:grid-cols-2
              lg:col-span-2
            "
          >

            {/* === LINEUP === */}

            {event.lineup?.length > 0 && (
              <section aria-labelledby="lineup-heading">

                <h2
                  id="lineup-heading"
                  className="mb-6 text-left text-2xl font-medium uppercase"
                >
                  Lineup
                </h2>

                <ul className="space-y-4">
                  {event.lineup.map((artist, index) => (
                    <li
                      key={`${artist}-${index}`}
                      className="border-b border-white/10 pb-3 text-gray-200"
                    >
                      {artist}
                    </li>
                  ))}
                </ul>

              </section>
            )}

            {/* === SCHEDULE === */}

            {event.schedule?.length > 0 && (
              <section aria-labelledby="schedule-heading">

                <h2
                  id="schedule-heading"
                  className="mb-6 text-left text-2xl font-medium uppercase"
                >
                  Schedule
                </h2>

                <ol className="space-y-1">
                  {event.schedule.map((item, index) => (
                    <li
                      key={index}
                      className="
                        flex items-start gap-5
                        border-b border-white/10
                        py-3
                      "
                    >
                      <span className="w-14 shrink-0 font-medium text-white">
                        {item.time}
                      </span>

                      <span className="text-gray-300">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ol>

              </section>
            )}

          </section>

          {/* === EVENT DETAILS AND BOOKING === */}

          <aside
            aria-labelledby="event-details-heading"
            className="
              self-start
              border border-white/20
              p-6 md:p-8
            "
          >

            <h2
              id="event-details-heading"
              className="mb-6 text-left text-xl font-medium uppercase"
            >
              Event Details
            </h2>

            <dl className="space-y-5">

              {/* Price */}

              <div className="flex items-center justify-between gap-4">
                <dt className="text-xs uppercase tracking-wide text-gray-400">
                  Price
                </dt>

                <dd className="text-right font-medium">
                  {event.price}
                </dd>
              </div>

              {/* Age limit */}

              <div className="flex items-center justify-between gap-4">
                <dt className="text-xs uppercase tracking-wide text-gray-400">
                  Age Limit
                </dt>

                <dd className="text-right font-medium">
                  {event.ageLimit}
                </dd>
              </div>

              {/* Category */}

              <div className="flex items-center justify-between gap-4">
                <dt className="text-xs uppercase tracking-wide text-gray-400">
                  Category
                </dt>

                <dd className="text-right font-medium">
                  {event.category}
                </dd>
              </div>

            </dl>

            {/* === BOOKING BUTTON === */}

            <Link
              href={`/booking?eventId=${event.id}`}
              className="
                mt-8 block w-full
                border border-white
                bg-white px-6 py-4
                text-center text-sm
                font-medium uppercase
                tracking-wide text-black
                transition-colors duration-200
                hover:bg-transparent hover:text-white
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
              "
            >
              Book Table
            </Link>

          </aside>

        </section>

        {/* === ABOUT THE EVENT === */}

        <section
          aria-labelledby="about-event-heading"
          className="
            w-full
            border-t border-white/20
            pt-10 md:pt-14
          "
        >

          {/* Section heading */}

          <h2
            id="about-event-heading"
            className="
              mb-6 text-left text-2xl
              font-medium uppercase
              md:text-3xl
            "
          >
            About the Event
          </h2>

          {/* Introductory description - full width */}

          {event.description && (
            <p className="mb-8 text-lg leading-relaxed text-white">
              {event.description}
            </p>
          )}

          {/* Event content - responsive text columns */}

          <div
            className="
              columns-1
              gap-10
              lg:columns-2
              lg:gap-16
            "
          >
            {event.content
              ?.split("\n\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-5 leading-8 text-gray-300"
                >
                  {paragraph}
                </p>
              ))}
          </div>

        </section>

      </article>

    </main>
  );
}