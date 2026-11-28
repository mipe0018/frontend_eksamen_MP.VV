
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import heroBackground from "../../assets/header/header_bg_2.webp";
import heroLogo from "../../assets/header/Logo_hero.webp";
import bottomLine from "../../assets/header/bottom_line.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden md:min-h-[600px]">

      {/* Hero background */}
      <Image
        src={heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-[var(--color-black)]/40"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">

        {/* Hero logo */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative h-[75px] w-[280px] sm:h-[100px] sm:w-[420px] md:h-[130px] md:w-[550px]"
        >
          <Image
            src={heroLogo}
            alt="Night Club"
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 768px) 420px, 550px"
            className="object-contain"
          />
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="-mt-5 text-sm font-bold tracking-[0.5em] text-[var(--color-white)] sm:-mt-6 sm:text-base md:-mt-7 md:text-lg"
        >
          HAVE A GOOD TIME
        </motion.p>

        {/* Decorative line below slogan */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="relative mt-3 mb-6 h-5 w-[260px] sm:w-[340px] md:h-6 md:w-[420px]"
        >
          <Image
            src={bottomLine}
            alt=""
            fill
            sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 420px"
            className="object-contain"
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row"
        >

          {/* View Events */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/events"
              className="flex min-h-[32px] items-center justify-center border border-[var(--color-white)] px-5 py-2 text-[10px] font-medium text-[var(--color-white)] transition-colors hover:bg-[var(--color-white)] hover:text-[var(--color-black)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-white)]"
            >
              VIEW EVENTS
            </Link>
          </motion.div>

          {/* Book Table - pink to purple gradient */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px var(--color-primary)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/booking"
              className="flex min-h-[32px] items-center justify-center border-0 px-5 py-2 text-[10px] font-semibold text-[var(--color-white)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-white)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, color-mix(in oklch, var(--color-primary) 65%, var(--color-white)), oklch(55% 0.20 310))",
                boxShadow: "0 0 12px var(--color-primary)",
              }}
            >
              BOOK TABLE
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
