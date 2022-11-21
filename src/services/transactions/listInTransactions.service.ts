import AppDataSource from "../../data-source"
import { Transaction } from "../../entities/transaction.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

export const listIntTransactionsService = async (
  id: string
): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User)
  const transactionRepository = AppDataSource.getRepository(Transaction)

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  const inTransactions = await transactionRepository.find({
    where: { creditedAccount: user.account },
  })

  if (inTransactions.length < 1) {
    throw new AppError("Nenhuma transação foi encontrada!", 404)
  }

  return inTransactions
}
