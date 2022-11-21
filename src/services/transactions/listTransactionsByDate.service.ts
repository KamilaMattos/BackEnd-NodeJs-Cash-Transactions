import AppDataSource from "../../data-source"
import { Transaction } from "../../entities/transaction.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { Between } from "typeorm"

export const listTransactionsByDateService = async (
  id: string,
  date: string
): Promise<Transaction[]> => {
  const userRepository = AppDataSource.getRepository(User)
  const transactionRepository = AppDataSource.getRepository(Transaction)

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  //função para adicionar dia após a data da transação
  const countDay = (numDays: number, date: Date) => {
    return new Date(date.valueOf() + 864e5 * numDays)
  }

  const dateOfTransaction = new Date(date)
  const dayAfterTransaction = countDay(1, dateOfTransaction)

  const transactions = await transactionRepository.find({
    where: [
      {
        debitedAccount: user.account,
        createdAt: Between(dateOfTransaction, dayAfterTransaction),
      },
      {
        creditedAccount: user.account,
        createdAt: Between(dateOfTransaction, dayAfterTransaction),
      },
    ],
  })

  return transactions
}
