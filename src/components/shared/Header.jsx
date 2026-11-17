
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Book Table", href: "/book-table" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6">
      

        {/* Desktop */}
        <div className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="hover:opacity-50">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="text-2xl md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="flex flex-col gap-6 bg-black p-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="hover:opacity-50"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
