// Importerer Zod, som bruges til at definere og validere formularens data.
import { z } from "zod";

// Opretter et schema, der beskriver, hvilke felter formularen indeholder,
// og hvilke krav brugeren skal opfylde, før formularen kan sendes.
export const contactSchema = z.object({
  // Navn skal være tekst, mellemrum fjernes fra start/slut,
  // og navnet skal indeholde mindst 2 tegn.
  name: z.string().trim().min(2, "Please enter your name"),

  // E-mail skal have et gyldigt e-mailformat.
  email: z.email("Please enter a valid email address"),

  // Beskeden skal være tekst, og den skal indeholde mindst 10 tegn,
  // efter eventuelle mellemrum i begyndelsen og slutningen er fjernet.
  content: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters"),
});