
import PageHero from "../../components/global/PageHero.jsx";
import BookingContent from "../../components/booking/BookingContent.jsx";

// ========================================
// BOOKING PAGE
// ========================================

// Siden indeholder kun layout.
// Al bookinglogik ligger i BookingContent.
export default function BookTable() {
  return (
    <main>
      {/* SIDENS OVERSKRIFT */}
      <PageHero title="Book Table" showLine />

      {/* BOOKINGKOMPONENTER */}
      <section className="container-content">
        <BookingContent />
      </section>
    </main>
  );
}
