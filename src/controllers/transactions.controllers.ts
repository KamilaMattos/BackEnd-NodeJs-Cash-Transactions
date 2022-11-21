import { Request, Response } from "express"
import { IOutTransaction } from "../interfaces/transactions"
import { createOutTransactionService } from "../services/transactions/createOutTransaction.service"
import { listIntTransactionsService } from "../services/transactions/listInTransactions.service"
import { listOutTransactionsService } from "../services/transactions/listOutTransactions.service"
import { listTransactionsService } from "../services/transactions/listTransactions.service"
import { listTransactionsByDateService } from "../services/transactions/listTransactionsByDate.service"

export const createOutTransactionController = async (
  req: Request,
  res: Response
) => {
  const transactionInfos: IOutTransaction = req.body
  const senderUserId = req.user.id

  const transaction = await createOutTransactionService(
    senderUserId,
    transactionInfos
  )

  return res.status(201).json(transaction)
}

export const listTransactionsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id
  const transactions = await listTransactionsService(userId)

  return res.status(200).json(transactions)
}

export const listTransactionsByDateController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id
  const date = req.params.date
  const transactions = await listTransactionsByDateService(userId, date)

  return res.status(200).json(transactions)
}

export const listOutTransactionsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id
  const transactions = await listOutTransactionsService(userId)

  return res.json(transactions)
}

export const listIntTransactionsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id
  const transactions = await listIntTransactionsService(userId)

  return res.json(transactions)
}
