
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/header/Logo.webp";
import bottomLine from "../../assets/header/bottom_line2.webp";

const links = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Book Table", href: "/book-table" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Luk mobilmenuen med Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className="relative w-full border-y border-[var(--color-primary)] bg-black text-white">

      {/* Trekant øverst til venstre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-10 w-10 bg-[var(--color-primary)] [clip-path:polygon(0_0,100%_0,0_100%)]"
      />

      {/* Trekant nederst til højre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-10 w-10 bg-[var(--color-primary)] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
      />

      {/* Centreret container */}
      <nav
        aria-label="Main navigation"
        className="container-content relative z-10 flex items-center justify-between gap-8 py-5"
      >
        {/* Logo til venstre */}
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

        {/* Desktop navigation */}
        <ul className="ml-auto flex items-center gap-8 max-[700px]:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative inline-block text-sm font-semibold transition-colors duration-300 hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
              >
                {link.name}

                {/* Dekorativ streg ved hover */}
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

        {/* Burgerknap på mobil */}
        <button
          type="button"
          className="ml-auto hidden text-3xl leading-none max-[700px]:block"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* Mørk baggrund bag mobilmenu */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 min-[701px]:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobilmenu fra højre */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-[400px] flex-col bg-black px-8 pt-20 transition-transform duration-300 min-[701px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Luk mobilmenu */}
        <button
          type="button"
          className="absolute top-4 right-6 text-4xl"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        {/* Mobilnavigation */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-neutral-700 py-4 transition-colors duration-300 hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
