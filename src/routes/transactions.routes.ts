import { Router } from "express"
import {
  createOutTransactionController,
  listIntTransactionsController,
  listOutTransactionsController,
  listTransactionsByDateController,
  listTransactionsController,
} from "../controllers/transactions.controllers"

import { authToken } from "../middlewares/authToken.middleware"
import { schemaValidation } from "../middlewares/schemaValidation.middleware"
import { transactionSchema } from "../schemas/transactions.schema"

const routes = Router()
export const transactionsRoutes = () => {
  routes.post(
    "",
    authToken,
    schemaValidation(transactionSchema),
    createOutTransactionController
  )
  routes.get("", authToken, listTransactionsController)
  routes.get("/date/:date", authToken, listTransactionsByDateController)
  routes.get("/cashout", authToken, listOutTransactionsController)
  routes.get("/cashin", authToken, listIntTransactionsController)

  return routes
}
