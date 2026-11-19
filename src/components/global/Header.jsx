
"use client";

// ========================================
// 1. IMPORTS
// ========================================

// React hooks til at håndtere mobilmenuen.
import { useEffect, useState } from "react";

// Next.js-komponenter.
import Link from "next/link";
import Image from "next/image";

// Billeder til logo og desktopnavigation.
// Baggrundsbilledet er fjernet.
import logo from "../../assets/header/Logo.webp";
import bottomLine from "../../assets/header/bottom_line2.webp";

// ========================================
// 2. NAVIGATIONSLINKS
// ========================================

// Links genbruges på både desktop og mobil.
const links = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Book Table", href: "/booking" },
  { name: "Contact Us", href: "/contact" },
];

// ========================================
// 3. HEADER COMPONENT
// ========================================

export default function Header() {

  // false = menuen er lukket.
  // true = menuen er åben.
  const [open, setOpen] = useState(false);

  // ========================================
  // 4. MOBILMENU FUNKTIONALITET
  // ========================================

  useEffect(() => {

    // Funktionen aktiveres kun,
    // når mobilmenuen er åben.
    if (!open) return;

    // Luk menuen, når brugeren trykker Escape.
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    // Tilføj tastatur-eventlistener.
    document.addEventListener("keydown", handleEscape);

    // Gem sidens nuværende scroll-indstilling.
    const previousOverflow = document.body.style.overflow;

    // Forhindrer scrolling bag den åbne menu.
    document.body.style.overflow = "hidden";

    // Cleanup, når menuen lukkes.
    return () => {
      document.removeEventListener("keydown", handleEscape);

      // Genskab sidens oprindelige scroll-indstilling.
      document.body.style.overflow = previousOverflow;
    };

  }, [open]);

  // ========================================
  // 5. HEADER
  // ========================================

  return (
    <header className="relative w-full border-y border-[var(--color-primary)] bg-black text-white">

      {/* ========================================
          6. DEKORATIVE HJØRNER
      ======================================== */}

      {/* Øverste venstre trekant. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-10 w-10 bg-[var(--color-primary)] [clip-path:polygon(0_0,100%_0,0_100%)]"
      />

      {/* Nederste højre trekant. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-10 w-10 bg-[var(--color-primary)] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
      />

      {/* ========================================
          7. HEADER NAVIGATION
      ======================================== */}

      <nav
        aria-label="Main navigation"
        className="container-content relative z-10 flex items-center justify-between gap-8 py-5 max-[700px]:px-10"
      >

        {/* LOGO */}

        {/* Logoet linker til forsiden. */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt="AskExperts"
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* ========================================
            8. DESKTOP NAVIGATION
        ======================================== */}

        {/*
          ml-auto:
          Skubber navigationen mod højre.

          flex:
          Placerer links vandret.

          gap-8:
          Giver afstand mellem links.

          max-[700px]:hidden:
          Skjuler navigationen på mobil.
        */}
        <ul className="ml-auto flex items-center gap-8 max-[700px]:hidden">

          {links.map((link) => (
            <li key={link.href}>

              {/* Desktop navigation link. */}
              <Link
                href={link.href}
                className="group relative inline-block text-base font-medium uppercase transition-colors duration-300 hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
              >
                {link.name}

                {/*
                  Dekorativ hover-linje.

                  opacity-0:
                  Skjult som standard.

                  group-hover:opacity-100:
                  Vises ved hover.

                  group-focus-visible:opacity-100:
                  Vises ved tastaturfokus.
                */}
                <Image
                  src={bottomLine}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute top-full left-1/2 mt-1 w-[100px] max-w-none -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                />

              </Link>
            </li>
          ))}
        </ul>

        {/* ========================================
            9. BURGERKNAP
        ======================================== */}

        {/*
          Burgerknappen vises kun på mobil.

          hidden:
          Skjult på desktop.

          max-[700px]:block:
          Vises på skærme op til 700 px.

          onClick:
          Åbner mobilmenuen.
        */}
        <button
          type="button"
          className="ml-auto hidden cursor-pointer text-3xl leading-none max-[700px]:block"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

      </nav>

      {/* ========================================
          10. MOBILMENU
      ======================================== */}

      {/*
        Menuen vises kun, når open er true.

        fixed:
        Menuen placeres i forhold til skærmen.

        inset-0:
        Menuen fylder hele skærmen.

        z-50:
        Placerer menuen over headeren.

        bg-black/50:
        Sort baggrund med 50 % opacity.

        backdrop-blur-sm:
        Giver en diskret sløring af indholdet bag menuen.
        Fjern klassen, hvis du kun ønsker gennemsigtighed.

        min-[701px]:hidden:
        Skjuler mobilmenuen på desktop.
      */}
      {open && (
        <aside
          id="mobile-menu"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 flex flex-col bg-black/50 text-white backdrop-blur-sm min-[701px]:hidden"
        >

          {/* ========================================
              11. LUK-KNAP
          ======================================== */}

          {/*
            Krydset lukker mobilmenuen.

            absolute:
            Placerer knappen frit i menuen.

            top-6:
            24 px fra toppen.

            right-8:
            32 px fra højre side.

            z-20:
            Sørger for, at knappen ligger øverst.

            onClick:
            Sætter open til false og lukker menuen.
          */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 z-20 flex h-11 w-11 cursor-pointer items-center justify-center text-4xl leading-none text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
          >
            ×
          </button>

          {/* ========================================
              12. MOBILNAVIGATION
          ======================================== */}

          {/*
            Navigationen placeres midt på skærmen.

            flex-1:
            Udfylder menuens højde.

            items-center:
            Centrerer vandret.

            justify-center:
            Centrerer lodret.
          */}
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 items-center justify-center"
          >

            {/*
              flex-col:
              Links placeres under hinanden.

              items-center:
              Links centreres vandret.

              gap-8:
              32 px mellem linksene.

              text-center:
              Centrerer teksten.
            */}
            <ul className="flex flex-col items-center gap-8 text-center">

              {/* Genbruger navigationens links-array. */}
              {links.map((link) => (
                <li key={link.href}>

                  {/*
                    Når et link klikkes:
                    1. Brugeren navigerer til siden.
                    2. Mobilmenuen lukkes.

                    text-xl:
                    Bestemmer tekststørrelsen.

                    uppercase:
                    Viser links med store bogstaver.

                    hover:
                    Skifter til primærfarven ved hover.
                  */}
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium uppercase transition-colors duration-300 hover:text-[var(--color-primary)] active:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>
          </nav>

        </aside>
      )}

    </header>
  );
}
