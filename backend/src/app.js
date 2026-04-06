import cors from "cors"
import express from "express"
import helmet from "helmet"

import { errorHandler } from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import recordRouter from "./routes/record.routes.js"
import userRouter from "./routes/user.routes.js"

const createApp = () => {
  const app = express()

  app.use(helmet())

  const clientUrl = process.env.CLIENT_URL
  app.use(
    cors(
      clientUrl
        ? { origin: clientUrl, credentials: true }
        : { origin: "*", credentials: false }
    )
  )
  app.use(express.json())
  app.use("/api/auth", authRouter)
  app.use("/api/dashboard", dashboardRouter)
  app.use("/api/records", recordRouter)
  app.use("/api/users", userRouter)
  app.use(errorHandler)

  return app
}

export default createApp
