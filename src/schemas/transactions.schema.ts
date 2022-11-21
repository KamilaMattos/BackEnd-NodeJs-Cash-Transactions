import * as yup from "yup"
import { SchemaOf } from "yup"
import { IOutTransaction } from "../interfaces/transactions"

export const transactionSchema: SchemaOf<IOutTransaction> = yup.object().shape({
  usernameReceiver: yup
    .string()
    .required("O nome de usuário é obrigatório!")
    .min(3, "Digite um nome de usuário válido!"),
  value: yup
    .number()
    .required("O valor é obrigatório!")
    .test("O valor não pode ser menor que zero!", (value) => value! > 0),
})
