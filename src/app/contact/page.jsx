// Importerer den fælles PageHero-komponent, som viser sidens overskrift.
import PageHero from "../../components/global/PageHero.jsx";

// Importerer kontaktformularen, som vi har lavet i en separat komponent.
import ContactForm from "../../components/contact/ContactForm.jsx";

// Kontakt-sidens hovedkomponent.
// Denne er en Server Component, da den ikke selv håndterer interaktivitet.
export default function Contact() {
  return (
    <main>
      {/* Viser sidens hero-sektion med titel og dekorativ linje. */}
      <PageHero title="Contact Us" showLine />

      {/* Giver formularen samme containerbredde og styling som resten af siden. */}
      <section className="container-content py-14 text-white">
        {/* Indsætter vores interaktive kontaktformular. */}
        <ContactForm />
      </section>
    </main>
  );
}