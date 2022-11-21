import { Router } from "express"
import { listBalanceController } from "../controllers/account.controllers"
import { authToken } from "../middlewares/authToken.middleware"

const routes = Router()

export const accountsRoutes = () => {
  routes.get("", authToken, listBalanceController)
  return routes
}
