import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUser } from "../../interfaces/users"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginService = async ({
  username,
  password,
}: IUser): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ username })


  if (!user) {
    throw new AppError("Nome de usuário ou senha inválidos!", 401)
  }


  const checkPassword = await compare(password, user.password)

  if (!checkPassword) {
    throw new AppError("Credenciais inválidas!", 403)
  }

  const token = jwt.sign(
    {
      //id: user.id
      //   isAdm: user.isAdm,
      //   isActive: user.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  )

  return token
}
