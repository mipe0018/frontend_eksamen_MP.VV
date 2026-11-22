
import Image from "next/image";

import footerBg from "../../assets/footerbg.webp";
import logo from "../../assets/header/Logo.webp";
import recentPost1 from "../../assets/recent_post1.jpg";
import recentPost2 from "../../assets/recent_post2.jpg";

const newsItems = [
  {
    id: 1,
    image: recentPost1,
    alt: "NightClub DJ and music event",
    text: "Discover the latest music events and experiences at NightClub.",
    date: "April 17, 2026",
  },
  {
    id: 2,
    image: recentPost2,
    alt: "NightClub party and dance floor",
    text: "Experience unforgettable nights with music, drinks and great company.",
    date: "April 17, 2026",
  },
];

const recentPosts = [
  {
    id: 1,
    text: "Discover what makes NightClub the place for unforgettable nights.",
    time: "5 hours ago",
  },
  {
    id: 2,
    text: "Stay updated on upcoming events, music and experiences at NightClub.",
    time: "8 hours ago",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Main footer content */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 md:gap-12 md:py-14">

        {/* Location and opening hours */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">

          <Image
            src={logo}
            alt="NightClub logo"
            width={150}
            height={50}
            className="mb-8 h-auto w-40"
          />

          <h2 className="mb-3 text-sm font-bold uppercase text-[var(--color-primary)]">
            Location
          </h2>

          <address className="text-sm not-italic leading-6 text-white/90">
            Kompagnistræde 278
            <br />
            1265 København K
          </address>

          <h2 className="mb-3 mt-7 text-sm font-bold uppercase text-[var(--color-primary)]">
            Opening Hours
          </h2>

          <p className="text-sm leading-6 text-white/90">
            WED - THU 10:30 PM TO 3 AM
            <br />
            SAT - SUN 11 PM TO 5 AM
          </p>
        </div>

        {/* News - desktop only */}
        <div className="hidden md:block">

          <h2 className="mb-7 text-sm font-bold uppercase text-[var(--color-primary)]">
            News
          </h2>

          <div className="space-y-6">
            {newsItems.map((item) => (
              <article key={item.id} className="flex gap-4">

                <Image
                  src={item.image}
                  alt={item.alt}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 object-cover"
                />

                <div>
                  <p className="text-sm leading-6 text-white/90">
                    {item.text}
                  </p>

                  <time className="mt-2 block text-xs text-[var(--color-primary)]">
                    {item.date}
                  </time>
                </div>

              </article>
            ))}
          </div>
        </div>

        {/* Recent posts - desktop only */}
        <div className="hidden md:block">

          <h2 className="mb-7 text-sm font-bold uppercase text-[var(--color-primary)]">
            Recent Posts
          </h2>

          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.id} className="flex gap-4">

                <span
                  className="text-lg text-[var(--color-primary)]"
                  aria-hidden="true"
                >
                  X
                </span>

                <div>
                  <p className="text-sm leading-6 text-white/90">
                    {post.text}
                  </p>

                  <p className="mt-2 text-xs text-[var(--color-primary)]">
                    {post.time}
                  </p>
                </div>

              </article>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom footer */}
      <div className="relative border-t border-white/10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 px-6 py-8 text-center md:flex-row md:gap-6">

          {/* Left: All rights reserved */}
          <p className="order-2 text-xs text-white/60 md:order-1">
            Night Club - All Rights Reserved
          </p>

          {/* Center: Social media */}
          <div className="order-1 flex flex-col items-center gap-3 md:order-2">

            <p className="text-sm font-medium">
              Stay Connected With Us
            </p>

           
<div className="flex items-center gap-3">

  {/* Facebook */}
  <a
    href="#"
    aria-label="Facebook"
    className="flex h-9 w-9 items-center justify-center border border-white text-white transition-colors hover:text-[var(--color-primary)]"
  >
    <span className="text-xl font-bold">f</span>
  </a>

  {/* Snapchat */}
  <a
    href="#"
    aria-label="Snapchat"
    className="flex h-9 w-9 items-center justify-center border border-white text-white transition-colors hover:text-[var(--color-primary)]"
  >
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5c-3.1 0-5.2 2.2-5.2 5.5v2.8c0 .5-.2.8-.6 1.1-.4.3-1 .5-1.6.6-.4.1-.7.4-.6.8.1.4.5.6 1 .7.7.1 1.4.3 1.8.7.3.3.4.7.3 1.1-.1.6-.6 1-1.3 1.3-.5.2-1.1.3-1.7.4-.4.1-.6.4-.5.8.1.4.4.6.8.6.8.1 1.5.3 2 .8.4.4.7.9 1.3 1.1.6.2 1.3.1 2-.2.7-.3 1.4-.5 2.3-.5s1.6.2 2.3.5c.7.3 1.4.4 2 .2.6-.2.9-.7 1.3-1.1.5-.5 1.2-.7 2-.8.4 0 .7-.2.8-.6.1-.4-.1-.7-.5-.8-.6-.1-1.2-.2-1.7-.4-.7-.3-1.2-.7-1.3-1.3-.1-.4 0-.8.3-1.1.4-.4 1.1-.6 1.8-.7.5-.1.9-.3 1-.7.1-.4-.2-.7-.6-.8-.6-.1-1.2-.3-1.6-.6-.4-.3-.6-.6-.6-1.1V8c0-3.3-2.1-5.5-5.2-5.5Z" />
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="flex h-9 w-9 items-center justify-center border border-white text-white transition-colors hover:text-[var(--color-primary)]"
  >
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  </a>

</div>

          </div>

          {/* Right: Copyright */}
          <p className="order-3 text-xs text-white/60">
            Copyright © NightClub
          </p>

        </div>
      </div>
    </footer>
  );
}
