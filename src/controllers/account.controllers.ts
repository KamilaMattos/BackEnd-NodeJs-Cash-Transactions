import { Request, Response } from "express"
import { listBalanceService } from "../services/accounts/listBalance.service"

export const listBalanceController = async (req: Request, res: Response) => {
  //busca o usuário pelo id
  const userId = req.user.id

  //chama o service de listagem de balance passando o id do user
  const balance = await listBalanceService(userId)

  //retorna o balance
  return res.json(balance)
}
