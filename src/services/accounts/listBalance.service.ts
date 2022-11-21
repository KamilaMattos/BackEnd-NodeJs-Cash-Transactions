import AppDataSource from "../../data-source"
import { Account } from "../../entities/account.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IAccountBalance } from "../../interfaces/accounts"

export const listBalanceService = async (
  id: string
): Promise<IAccountBalance> => {
  //busca os repos de user e account
  const userRepository = AppDataSource.getRepository(User)
  const accountRepository = AppDataSource.getRepository(Account)

  //busca o usuario pelo id
  const user = await userRepository.findOneBy({ id })

  //mensagem de erro caso não encontre o usuário indicado
  if (!user) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  //busca a conta pelo id da conta do usuario
  const account = await accountRepository.findOneBy({ id: user.account.id })

  //mensagem de erro caso não encontre a conta
  if (!account) {
    throw new AppError("Conta não encontrada!", 404)
  }

  //retorna o balance da conta informada
  return { balance: account.balance }
}
