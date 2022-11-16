export interface ITransaction {
  id: string
  value: number
  debitedAccount: string
  creditedAccount: string
  createdAt: string
}

export interface ITransactionRequest {
  username: string
  value: number
}

export interface ITransactionParams {
  cashin?: string
  cashout?: string
  date?: string
  year?: string
  month?: string
}
