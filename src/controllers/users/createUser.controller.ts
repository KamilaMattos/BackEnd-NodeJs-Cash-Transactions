import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import { createUserService } from "../../services/users/cretateUser.service"

export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body
  const user = await createUserService(userData)
  return res.status(201).json(instanceToPlain(user))
}
