import express from "express"
import {vendor_signup, vendor_signin} from "../controllers/vendorController.js"
import {vendorProtect} from "../middlewares/auth-handler.js"

const vendor_router = express.Router()

vendor_router.route("/").post(vendor_signup)

vendor_router.post("/signin", vendor_signin)

export default vendor_router
