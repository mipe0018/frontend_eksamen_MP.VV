
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/header/Logo.png";

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
    <header className="relative w-full bg-black text-white">

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

      {/* Container: Maks. 1400px, centreret */}
      <nav
        aria-label="Main navigation"
        className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between gap-8 px-8 py-5 max-[700px]:px-6"
      >

        {/* Logo til venstre */}
        <Link
          to="/"
          aria-label="Go to homepage"
          className="shrink-0"
        >
          <img
            src={logo}
            alt="AskExperts"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop navigation til højre */}
        <ul className="ml-auto flex items-center gap-8 max-[700px]:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="relative text-sm font-semibold"
              >
                {link.name}

                {/* Hover underline - aktiveres senere:
                    after:absolute after:inset-x-0
                    after:-bottom-2 after:h-[3px]
                    after:rounded-full
                    after:bg-[var(--color-primary)]
                    after:scale-x-0
                    after:transition-transform
                    hover:after:scale-x-100
                    focus-visible:after:scale-x-100
                */}
              </Link>
            </li>
          ))}
        </ul>

        {/* Burgerknap til højre på mobil */}
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
              to={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-neutral-700 py-4"
            >
              {link.name}

              {/* Hover - aktiveres senere:
                  hover:text-[var(--color-primary)]
              */}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
