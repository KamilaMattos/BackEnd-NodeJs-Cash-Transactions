import { Router } from "express"

import { schemaValidation } from "../middlewares/schemaValidation.middleware"
import { authToken } from "../middlewares/authToken.middleware"

import { userSchema } from "../schemas/user.schema"

import {
  createUserController,
  listUserController,
} from "../controllers/user.controllers"

const routes = Router()

export const usersRoutes = () => {
  routes.post("", schemaValidation(userSchema), createUserController)
  routes.get("", authToken, listUserController)

  return routes
}
