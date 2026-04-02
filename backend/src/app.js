import cors from "cors"
import express from "express"

import { errorHandler } from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.routes.js"

const createApp = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use("/api/auth", authRouter)
  app.use(errorHandler)

  return app
}

export default createApp
