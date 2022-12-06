import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import {errorHandler} from "./middlewares/error-handler.js"
import connectDB from "./config/db.js"
import vendor_router from "./routes/vendor_routes.js"

const app = express()

dotenv.config({path: "./config/config.env"})
connectDB().then()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use("/api/vendor", vendor_router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server starting at PORT ${PORT}`)
})
