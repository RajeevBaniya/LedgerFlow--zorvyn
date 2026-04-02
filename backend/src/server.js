import "dotenv/config"

import createApp from "./app.js"
import { initApp } from "./config/init.js"

const app = createApp()

const port = process.env.PORT

if (!port) {
  throw new Error("PORT is required")
}

const server = app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
  initApp()
})

server.ref()
process.stdin.resume()
