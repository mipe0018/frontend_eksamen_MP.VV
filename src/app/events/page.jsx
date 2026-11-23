
import PageHero from "../../components/global/PageHero.jsx";
import EventList from "../../components/events/EventList.jsx";

const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

export default async function Events() {
  let events = [];

  try {
    const response = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Kunne ikke hente events");
    }

    events = await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af events:", error);
  }

  return (
    <main>
      <PageHero title="Events" showLine />

     
<section className="pt-12 text-white">
  {events.length > 0 ? (
    <EventList events={events} />
  ) : (
    <p className="text-center py-12">
      Events kunne ikke indlæses. Prøv igen senere.
    </p>
  )}
</section>

    </main>
  );
}
