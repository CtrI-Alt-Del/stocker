import { stringSchema } from './string-schema'

export const cnpjSchema = stringSchema.refine((document) => {
  const replacedDocument = document.replace(/\D/g, '')
  return replacedDocument.length === 14 && !!Number(replacedDocument)
}, 'CNPJ inválido')
