import { Request, Response } from "express"
import { loginService } from "../../services/login/login.service"

export const loginController = async (req: Request, res: Response) => {
  const userData = req.body
  const token = await loginService(userData)
  return res.json({ token })
}
