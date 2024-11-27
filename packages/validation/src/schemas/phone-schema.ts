import { z } from "zod";

export const phoneSchema = z.string().regex(/^\d{13}$/, {
  message: "O número de telefone deve conter exatamente 13 dígitos numéricos.",
});
