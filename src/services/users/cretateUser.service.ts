import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser } from "../../interfaces/users"
import { AppError } from "../../errors/appError"
import { hash } from "bcryptjs"
import { Account } from "../../entities/account.entity"

export const createUserService = async ({
  username,
  password,
}: IUser): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User)
  const accountRepository = AppDataSource.getRepository(Account)

  const userAlreadyExists = await userRepository.findOneBy({ username })

  if (userAlreadyExists) {
    throw new AppError("Usuário já cadastrado!", 400)
  }

  const createdUserAccount = accountRepository.create({
    balance: 100,
  })

  await accountRepository.save(createdUserAccount)

  const hashedPassword = await hash(password, 10)

  const newUser = userRepository.create({
    username,
    password: hashedPassword,
    account: createdUserAccount,
  })

  await userRepository.save(newUser)

  return newUser
}
