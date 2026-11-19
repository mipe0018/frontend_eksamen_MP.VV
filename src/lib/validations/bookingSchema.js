import { z } from "zod";

// === BOOKING VALIDATION ===
export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),

  email: z
    .email("Please enter a valid email address."),

  guests: z
    .string()
    .min(1, "Please enter the number of guests.")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) &&
        Number(value) > 0,
      "Please enter a valid number of guests."
    ),

  comment: z
    .string()
    .trim()
    .max(500, "Comment must be under 500 characters.")
    .optional(),
});
