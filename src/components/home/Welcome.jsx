
import Image from "next/image";

import Rectangle1 from "@/assets/home/Rectangle_1.png";
import Rectangle2 from "@/assets/home/Rectangle_2.png";
import Rectangle3 from "@/assets/home/Rectangle_3.png";

export default function Welcome() {
  return (
    <section className="bg-[var(--color-black)] px-6 py-12">
      <div className="mx-auto max-w-[1060px]">
        <h2 className="mb-8 text-center text-base font-semibold tracking-widest text-[var(--color-white)]">
          WELCOME IN NIGHTCLUB
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Image
            src={Rectangle1}
            alt="Bordopdækning i Nightclub"
            className="h-full w-full object-cover"
          />

          <Image
            src={Rectangle2}
            alt="Madservering i Nightclub"
            className="h-full w-full object-cover"
          />

          <Image
            src={Rectangle3}
            alt="Gæster i Nightclub"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
