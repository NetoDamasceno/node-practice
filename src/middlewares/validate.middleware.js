import { z } from "zod";

const clientCreateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),

  lastName: z
    .string()
    .trim()
    .min(2, "O sobrenome deve ter pelo menos 2 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido."),

  status: z.enum(["new", "contacted", "customer"]),
});


const clientUpdateSchema = clientCreateSchema.partial();


export {
  clientCreateSchema,
  clientUpdateSchema,
};