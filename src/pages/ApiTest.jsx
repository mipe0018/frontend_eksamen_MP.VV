
import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://backend-eksamen-mp-vv.onrender.com";

export default function ApiTest() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("Henter events...");

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.events;

        if (!Array.isArray(list)) {
          throw new Error("Ukendt JSON-struktur");
        }

        setEvents(list);
        setStatus(`${list.length} events hentet`);
      })
      .catch((err) => {
        setStatus(`Fejl: ${err.message}`);
        console.error(err);
      });
  }, []);

  return (
    <main className="container-content py-8">
      <h1 className="mb-4 text-3xl font-bold">
        Events fra vores API
      </h1>

      <p>{status}</p>

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
