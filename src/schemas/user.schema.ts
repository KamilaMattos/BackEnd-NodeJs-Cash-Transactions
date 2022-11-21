import * as yup from "yup"
import YupPassword from "yup-password"

import { SchemaOf } from "yup"
import { IUser } from "../interfaces/users"

YupPassword(yup)

const userSchema: SchemaOf<IUser> = yup.object().shape({
  username: yup
    .string()
    .min(3, "O nome de usuário deve conter no mínimo três caracteres!")
    .required(),
  password: yup
    .string()
    .min(8, "A senha deve conter no mínimo oito caracteres!")
    .minUppercase(1, "A senha deve conter pelo menos uma letra maiúscula!")
    .minNumbers(1, "A senha deve conter pelo menos um número!")
    .required(),
})

export { userSchema }
