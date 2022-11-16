import { Router } from "express"
import { createUserController } from "../../controllers/users/createUser.controller"
import { listUsersController } from "../../controllers/users/listUsers.controller"
import { deleteUserController } from "../../controllers/users/softDeleteUser.controller"
import { authToken } from "../../middlewares/authToken.middleware"
import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware"
import { userSchema } from "../../schemas/user.schema"

export const usersRoute = Router()

usersRoute.post(
  "/register",
  schemaValidationMiddleware(userSchema),
  createUserController
)
usersRoute.get("", listUsersController)
//usersRoute.delete("/:id", authToken, deleteUserController)
