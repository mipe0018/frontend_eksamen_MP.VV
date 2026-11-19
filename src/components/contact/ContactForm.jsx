
"use client";

// useState bruges til at gemme status for formularens indsendelse.
import { useState } from "react";

// useForm håndterer formularens felter, valideringsfejl og indsendelse.
import { useForm } from "react-hook-form";

// Forbinder React Hook Form med vores Zod-schema.
import { zodResolver } from "@hookform/resolvers/zod";

// Importerer valideringsreglerne fra vores separate schema.
import { contactSchema } from "../../lib/validations/contactSchema";

// Basisadressen til vores backend-API.
const API_URL = "https://backend-eksamen-mp-vv.onrender.com";

export default function ContactForm() {
  // Gemmer formularens status:
  // "idle" = ingen aktuel status
  // "success" = beskeden blev sendt
  // "error" = beskeden kunne ikke sendes
  const [status, setStatus] = useState("idle");

  // Initialiserer React Hook Form.
  const {
    // Forbinder inputfelter med formularens interne state.
    register,

    // Validerer formularen og kalder onSubmit, hvis data er gyldige.
    handleSubmit,

    // Nulstiller formularens felter til deres standardværdier.
    reset,

    // Indeholder valideringsfejl og information om indsendelsen.
    formState: { errors, isSubmitting },
  } = useForm({
    // Bruger vores Zod-schema til at validere formularens data.
    resolver: zodResolver(contactSchema),

    // Formularens startværdier.
    defaultValues: {
      name: "",
      email: "",
      content: "",
    },
  });

  // Udføres, når brugeren sender en gyldig formular.
  // "data" indeholder værdierne fra name, email og content.
  async function onSubmit(data) {
    // Fjerner eventuelle tidligere succes- eller fejlbeskeder.
    setStatus("idle");

    try {
      // Sender formularens data til backend via HTTP POST.
      const response = await fetch(`${API_URL}/contact_messages`, {
        method: "POST",

        // Fortæller backend, at vi sender JSON-data.
        headers: {
          "Content-Type": "application/json",
        },

        // Konverterer JavaScript-objektet til JSON.
        body: JSON.stringify({
          // Indsætter navn, e-mail og besked fra formularen.
          ...data,

          // Tilføjer den aktuelle dato i ISO 8601-format.
          // Dette felt kræves af backend.
          date: new Date().toISOString(),
        }),
      });

      // fetch giver ikke automatisk en fejl ved fx HTTP 400 eller 500.
      // Derfor kontrollerer vi selv, om svaret var vellykket.
      if (!response.ok) {
        throw new Error("Message could not be sent");
      }

      // Viser succesbeskeden.
      setStatus("success");

      // Tømmer formularen efter vellykket indsendelse.
      reset();
    } catch (error) {
      // Fanger netværksfejl og fejl fra response.ok-kontrollen.
      console.error(error);

      // Viser fejlbeskeden til brugeren.
      setStatus("error");
    }
  }

  return (
    // handleSubmit kontrollerer Zod-valideringen, inden onSubmit kaldes.
    // noValidate slår browserens indbyggede validering fra,
    // så vi bruger Zod til at vise vores egne fejlbeskeder.
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto flex max-w-2xl flex-col gap-6"
    >
      <h2 className="mb-4 text-2xl font-medium uppercase">
        Get in Touch
      </h2>

      {/* NAVN */}
      <div className="flex flex-col gap-2">
        {/* htmlFor forbinder label med inputfeltets id. */}
        <label htmlFor="name" className="font-medium uppercase">
          Name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          // register knytter feltet til "name" i React Hook Form.
          {...register("name")}
          className="border border-white/30 bg-transparent px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
        />

        {/* Viser kun fejlbeskeden, hvis Zod finder en fejl i name. */}
        {errors.name && (
          <p className="text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium uppercase">
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          // Forbinder feltet med "email" i formularen.
          {...register("email")}
          className="border border-white/30 bg-transparent px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
        />

        {/* Viser fejlbesked, hvis e-mailadressen ikke er gyldig. */}
        {errors.email && (
          <p className="text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* BESKED */}
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-medium uppercase">
          Message
        </label>

        <textarea
          id="content"
          rows={6}
          // Forbinder tekstområdet med "content" i formularen.
          {...register("content")}
          className="resize-y border border-white/30 bg-transparent px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
        />

        {/* Viser fejlbesked, hvis beskeden er for kort. */}
        {errors.content && (
          <p className="text-sm text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

{/* SEND-KNAP */}
{/* Flex-containeren placerer knappen til højre i formularen. */}
<div className="flex w-full justify-end">

{/* SEND-KNAP */}
{/* Placerer knappen til højre i formularen. */}
<div className="flex w-full justify-end">
  <button
    type="submit"
    disabled={isSubmitting}
    className="!w-fit !bg-black !text-white !border-x-0 !border-t !border-b !border-white px-10 py-3 font-medium uppercase cursor-pointer transition-colors duration-300 hover:!text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSubmitting ? "Sending..." : "Send Message"}
  </button>
</div>

</div>
      {/* STATUSBESKEDER */}
      {/* aria-live fortæller skærmlæsere, når status ændrer sig. */}
      <div role="status" aria-live="polite">
        {/* Vises kun, hvis backend accepterede beskeden. */}
        {status === "success" && (
          <p className="text-green-400">
            Your message has been sent successfully!
          </p>
        )}

        {/* Vises kun, hvis indsendelsen mislykkedes. */}
        {status === "error" && (
          <p className="text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
