import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import Vendor from "../models/vendor.js"

const vendorProtect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.vendor = await Vendor.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not Authorized")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not Authorized")
  }
})

export {vendorProtect}
