import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserRequest } from "../interfaces/users"

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup
    .string()
    .required("O nome de usuário é obrigatório!")
    .min(3, "O nome de usuário deve conter no mínimo três caracteres!"),
  password: yup
    .string()
    .required("A senha é obrigatória!")
    .min(8, "Sua senha deve conter no mínimo oito caracteres!")
    .matches(/[A-Z]/, "Sua senha deve conter pelo menos uma letra maiúscula!")
    .matches(/[0-9]/, "Sua senha deve conter pelo menos um número!"),
})

export { userSchema }
