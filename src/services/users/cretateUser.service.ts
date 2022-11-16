import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserRequest } from "../../interfaces/users"
import { AppError } from "../../errors/appError"
import { hash } from "bcryptjs"
import { Account } from "../../entities/account.entity"

export const createUserService = async ({
  username,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User)
  const accountRepository = AppDataSource.getRepository(Account)
  const userAlreadyExists = await userRepository.findOneBy({
    username: username,
  })

  if (userAlreadyExists) {
    throw new AppError("Usuário já cadastrado!", 400)
  }

  const hashedPassword = await hash(password, 10)
  const createAccount = await accountRepository.save({})

  const createdUser = userRepository.create({
    username,
    password: hashedPassword,
    account: createAccount,
  })

  const savedUser = userRepository.save(createdUser)

  return savedUser
}
