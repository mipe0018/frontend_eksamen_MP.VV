import Link from "next/link";
import Image from "next/image";
import PageHero from "../../../components/global/PageHero.jsx";

const baseUrl = "https://backend-eksamen-mp-vv.onrender.com";

export default async function EventDetails({ params }) {
  const { id } = await params;

  const response = await fetch(`${baseUrl}/events/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente eventet");
  }

  const event = await response.json();

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
      <PageHero title={event.title} showLine />

      <section className="container-content py-14 text-white">

        {/* Event image */}
        {event.heroAsset?.url && (
          <div className="relative mb-12 aspect-[1170/500] overflow-hidden">
            <Image
              src={`${baseUrl}${event.heroAsset.url}`}
              alt={event.heroAsset.alt || event.title}
              fill
              sizes="(max-width: 768px) 100vw, 1170px"
              className="object-cover"
            />
          </div>
        )}

        {/* Event information */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-2 text-sm opacity-60">DATE</h2>
            <p className="text-lg">{eventDate}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm opacity-60">TIME</h2>
            <p className="text-lg">{eventTime}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm opacity-60">DOORS OPEN</h2>
            <p className="text-lg">{doorsOpen}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm opacity-60">LOCATION</h2>
            <p className="text-lg">{event.location}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-6 text-2xl font-medium">About the Event</h2>

          <p className="mb-6 text-lg">{event.description}</p>

          <div className="space-y-5">
            {event.content
              ?.split("\n\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="leading-7 opacity-80">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Lineup */}
        {event.lineup?.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-medium">Lineup</h2>

            <ul className="space-y-3">
              {event.lineup.map((artist) => (
                <li key={artist}>{artist}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Schedule */}
        {event.schedule?.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-medium">Schedule</h2>

            <div className="max-w-xl">
              {event.schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-8 border-b border-white/20 py-4"
                >
                  <span className="w-16">{item.time}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional information */}
        <div className="mb-12 flex flex-wrap gap-10">
          <div>
            <h2 className="mb-2 text-sm opacity-60">PRICE</h2>
            <p>{event.price}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm opacity-60">AGE LIMIT</h2>
            <p>{event.ageLimit}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm opacity-60">CATEGORY</h2>
            <p>{event.category}</p>
          </div>
        </div>

        {/* Booking button */}
        <Link
          href={`/booking?eventId=${event.id}`}
          className="inline-block bg-white px-10 py-4 font-medium text-black transition-opacity hover:opacity-70"
        >
          Book Table
        </Link>

      </section>
    </main>
  );
}