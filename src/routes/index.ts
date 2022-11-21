import { Express } from "express"

import { usersRoutes } from "./users.routes"
import { transactionsRoutes } from "./transactions.routes"
import { accountsRoutes } from "./accounts.routes"
import { sessionRoutes } from "./login.routes"

export const appRoutes = (app: Express) => {
  app.use("/login", sessionRoutes())
  app.use("/users", usersRoutes())
  app.use("/accounts", accountsRoutes())
  app.use("/transactions", transactionsRoutes())
}
