import { Router } from "express"
import { loginController } from "../controllers/login.controllers"
import { schemaValidation } from "../middlewares/schemaValidation.middleware"
import { userSchema } from "../schemas/user.schema"

const routes = Router()

export const sessionRoutes = () => {
  routes.post("", schemaValidation(userSchema), loginController)
  return routes
}
