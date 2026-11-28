
"use client";

// ========================================
// 1. IMPORTS
// ========================================

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Billeder til logo og navigation.
import logo from "../../assets/header/Logo.webp";
import bottomLine from "../../assets/header/bottom_line2.webp";

// ========================================
// 2. NAVIGATIONSLINKS
// ========================================

const links = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Book Table", href: "/booking" },
  { name: "Contact Us", href: "/contact" },
];

// ========================================
// 3. HEADER COMPONENT
// ========================================

export default function Header({ home = false }) {
  const pathname = usePathname();

  // State til mobilmenuen.
  const [open, setOpen] = useState(false);

  // ========================================
  // 4. MOBILMENU FUNKTIONALITET
  // ========================================

  useEffect(() => {
    if (!open) return;

    // Luk menuen med Escape.
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Forhindrer scrolling bag mobilmenuen.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cleanup.
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // ========================================
  // 5. SKJUL GLOBAL HEADER PÅ FORSIDEN
  // ========================================

  // Den globale Header i layout.jsx skal ikke vises
  // på forsiden. Her placeres Header i stedet efter Hero.
  if (pathname === "/" && !home) {
    return null;
  }

  // ========================================
  // 6. HEADER
  // ========================================

  return (
    <header className="relative w-full border-y border-[var(--color-primary)] bg-black text-white">

      {/* Dekorativt hjørne øverst til venstre. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-10 w-10 bg-[var(--color-primary)] [clip-path:polygon(0_0,100%_0,0_100%)]"
      />

      {/* Dekorativt hjørne nederst til højre. */}
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

        <Link
          href="/"
          aria-label="Go to homepage"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt="Night Club"
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* ========================================
            8. DESKTOP NAVIGATION
        ======================================== */}

        <ul className="ml-auto flex items-center gap-8 max-[700px]:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative inline-block text-base font-medium uppercase transition-colors duration-300 hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
              >
                {link.name}

                {/* Dekorativ linje ved hover og tastaturfokus. */}
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

      {open && (
        <aside
          id="mobile-menu"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 flex flex-col bg-black/50 text-white backdrop-blur-sm min-[701px]:hidden"
        >

          {/* LUK-KNAP */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 z-20 flex h-11 w-11 cursor-pointer items-center justify-center text-4xl leading-none text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
          >
            ×
          </button>

          {/* MOBIL NAVIGATION */}

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {links.map((link) => (
                <li key={link.href}>
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
