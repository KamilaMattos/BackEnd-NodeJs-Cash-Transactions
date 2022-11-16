import "reflect-metadata"
import "express-async-errors"
import express from "express"

import { usersRoute } from "./routes/users"
import { sessionRoutes } from "./routes/session"

import { handleErrorMiddleware } from "./middlewares/errors.middleware"
import { transactionsRoutes } from "./routes/transactions"

const app = express()
app.use(express.json())

app.use("/user", usersRoute)
app.use("/login", sessionRoutes)
app.use("/transactions", transactionsRoutes)

app.use(handleErrorMiddleware)

export default app
