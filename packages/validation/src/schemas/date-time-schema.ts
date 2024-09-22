import { stringSchema } from "./string-schema";

export const dateTimeSchema = stringSchema.datetime({message: "Data ou hora inválida"})
