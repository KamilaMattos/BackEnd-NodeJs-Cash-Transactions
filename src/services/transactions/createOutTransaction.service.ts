import AppDataSource from "../../data-source"

import { AppError } from "../../errors/appError"

import { Account } from "../../entities/account.entity"
import { Transaction } from "../../entities/transaction.entity"
import { User } from "../../entities/user.entity"

import { IOutTransaction } from "../../interfaces/transactions"

export const createOutTransactionService = async (
  senderUserId: string,
  { value, usernameReceiver }: IOutTransaction
): Promise<Transaction> => {
  //busca os repos
  const transactionsRepository = AppDataSource.getRepository(Transaction)
  const accountRepository = AppDataSource.getRepository(Account)
  const userRepository = AppDataSource.getRepository(User)

  //busca o usuario que enviará o dinheiro
  const senderUser = await userRepository.findOneBy({ id: senderUserId })

  //mensagem de erro caso o usuário não seja encontrado
  if (!senderUser) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  //busca a conta do usuário que envia o dinheiro
  const senderAccount = await accountRepository.findOneBy({
    id: senderUser.account.id,
  })

  //mensagem de erro caso a conta não seja encontrada
  if (!senderAccount) {
    throw new AppError("Conta não encontrada!", 404)
  }

  //verifica se o balance da conta de quem envia o dinheiro é suficiente
  if (senderAccount.balance < value) {
    throw new AppError("Saldo insuficiente!", 401)
  }

  //busca o usuário que receberá o dinheiro
  const takerUser = await userRepository.findOneBy({
    username: usernameReceiver,
  })

  //mensagem de erro caso o destinatário não seja encontrado
  if (!takerUser) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  //verifica se o username destinatário é o mesmo do remetente e retorna mensagem de erro
  if (senderUser.username === takerUser.username) {
    throw new AppError("Você não pode transferir para si mesmo!", 403)
  }

  //busca a conta que receberá o dinheiro
  const takerAccount = await accountRepository.findOneBy({
    id: takerUser.account.id,
  })

  //mensagem de erro caso a conta de destino não seja encontrada
  if (!takerAccount) {
    throw new AppError("Conta não encontrada", 404)
  }

  //atualiza o valor do balance do remetente
  await accountRepository.update(senderAccount.id, {
    balance: senderAccount.balance - value,
  })

  //atualiza o valor do balance do destinatário
  await accountRepository.update(takerAccount.id, {
    balance: takerAccount.balance + value,
  })

  //salva as infos no repo de transactions
  const newTransaction = transactionsRepository.save({
    debitedAccount: senderAccount,
    creditedAccount: takerAccount,
    value,
  })

  return newTransaction
}
