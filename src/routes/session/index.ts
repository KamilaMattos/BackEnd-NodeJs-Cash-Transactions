import { Router } from "express"
import { loginController } from "../../controllers/login/login.controller"
import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware"
import { userSchema } from "../../schemas/user.schema"

export const sessionRoutes = Router()

sessionRoutes.post("", schemaValidationMiddleware(userSchema), loginController)
