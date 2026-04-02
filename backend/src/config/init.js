import { seedAdmin } from "../services/auth.service.js"

const initApp = async () => {
  try {
    await seedAdmin()
    console.log("Admin seed completed")
  } catch (error) {
    console.error("Admin seed failed:", error.message)
  }
}

export { initApp }
