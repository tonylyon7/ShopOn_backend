import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import {generateToken} from "../utilities/generate_token.js"
import Vendor from "../models/vendor.js"
import {token} from "morgan"

export const vendor_signup = asyncHandler(async (req, res) => {
  const {email, userName, password} = req.body
  console.log(req.body)

  const vendorExist = await Vendor.find({
    $or: [{email: email}],
  })

  if (vendorExist.length > 0) {
    res.json({error: "Vendor already exist"})
  } else {
    const hashedPass = await bcrypt.hash(password, 10)

    const vendor = await Vendor.create({
      userName,
      email,
      password: hashedPass,
    })
    if (vendor) {
      res.status(201).json({
        status: "Ok",
        message: "Vendor created successfully",
        data: {
          id_: vendor._id,
          userName: vendor.userName,
          email: vendor.email,
          password: vendor.password,
          token: generateToken(user._id),
        },
      })
    } else {
      res.status(400).json({
        message: "Vendor data not found",
      })
    }
  }
})
