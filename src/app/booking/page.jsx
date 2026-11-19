import PageHero from "../../components/global/PageHero.jsx";
import TableGrid from "../../components/booking/TableGrid.jsx";

export default function BookTable() {
  return (
    <main>
      <PageHero title="Book Table" showLine />

      <section className="container-content">
        <TableGrid />
      </section>
    </main>
  );
}