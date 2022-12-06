import express from "express"
import {vendor_signup} from "../controllers/vendorController.js"
import {vendorProtect} from "../middlewares/auth-handler.js"

const vendor_router = express.Router()

vendor_router.route("/")
.post(vendor_signup)

export default vendor_router