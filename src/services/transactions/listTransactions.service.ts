import AppDataSource from "../../data-source"

import { Transaction } from "../../entities/transaction.entity"
import { User } from "../../entities/user.entity"

import { AppError } from "../../errors/appError"

export const listTransactionsService = async (
  id: string
): Promise<Transaction[]> => {
  //busca os repos
  const userRepository = AppDataSource.getRepository(User)
  const transactionsRepository = AppDataSource.getRepository(Transaction)

  //busca o user pelo id do param
  const user = await userRepository.findOneBy({ id })

  //mensagem de erro caso o usuário não seja encontrado
  if (!user) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  //busca as transações feitas pela conta do user
  const userTransactions = await transactionsRepository.find({
    where: [
      { debitedAccount: user.account },
      { creditedAccount: user.account },
    ],
  })

  return userTransactions
}
