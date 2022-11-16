import * as yup from "yup"
import { SchemaOf } from "yup"
import { ITransactionRequest } from "../interfaces/transactions"

export const transactionSchema: SchemaOf<ITransactionRequest> = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("O nome de usuário é obrigatório!")
      .min(3, "O nome de usuário deve conter no mínimo três caracteres!"),
    value: yup
      .number()
      .required("O valor é obrigatório!")
      .positive("Digite um valor não negativo!"),
    //   .min(1, "O valor não pode ser menor que 1"),
  })
