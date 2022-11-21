import AppDataSource from "../../data-source"
import { Transaction } from "../../entities/transaction.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

export const listOutTransactionsService = async (
  id: string
): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User)
  const transactionRepository = AppDataSource.getRepository(Transaction)

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  const outTransactions = await transactionRepository.find({
    where: { debitedAccount: user.account },
  })

  if (outTransactions.length < 1) {
    throw new AppError("Nenhuma transação foi encontrada!", 404)
  }

  return outTransactions
}
