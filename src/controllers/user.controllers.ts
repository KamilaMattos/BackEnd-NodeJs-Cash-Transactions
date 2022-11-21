import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"

import { createUserService } from "../services/users/cretateUser.service"
import { listUserService } from "../services/users/listUser.service"

import { IUser } from "../interfaces/users"

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body
  const user = await createUserService(userData)
  return res.status(201).json(instanceToPlain(user))
}

export const listUserController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const user = await listUserService(userId)
  return res.json(instanceToPlain(user))
}
