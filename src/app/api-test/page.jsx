
"use client";

import { useEffect, useState } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-eksamen-mp-vv.onrender.com"
).replace(/\/$/, "");

export default function ApiTest() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("Henter events...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setStatus("Henter events...");
        setError(null);

        const response = await fetch(`${API_URL}/events`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.events;

        if (!Array.isArray(list)) {
          throw new Error("Ukendt JSON-struktur fra API");
        }

        setEvents(list);
        setStatus(`${list.length} events hentet`);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Fejl ved hentning af events:", err);

        setError(err.message);
        setStatus("Kunne ikke hente events");
      }
    }

    fetchEvents();

    return () => controller.abort();
  }, []);

  return (
    <main className="container-content py-8">
      <h1 className="mb-4 text-3xl font-bold">
        Events fra vores API
      </h1>

      <p>{status}</p>

      {error && (
        <p className="mt-4 text-red-500">
          Fejl: {error}
        </p>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {events.map((event, index) => (
          <article
            key={event.id ?? index}
            className="rounded-xl bg-white p-5 text-black shadow"
          >
            <h2 className="text-xl font-bold">
              {event.title ?? "Uden titel"}
            </h2>

            <p>
              {event.location ?? "Ingen lokation angivet"}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
