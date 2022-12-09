import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { generateToken } from "../utilities/generate_token.js"
import Vendor from "../models/vendor.js"
import { token } from "morgan"

export const vendor_signup = asyncHandler(async(req, res) => {
    const { email, userName, password } = req.body
    console.log(req.body)

    const vendorExist = await Vendor.find()

    if (vendorExist.length > 0) {
        res.json({ error: "Vendor already exist" })
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

export const vendor_signin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const vendor = await Vendor.findOne({ email })
    if (!vendor || !bcrypt.compareSync(password, vendor.password)) {
        res.json({ error: "Email or password is incorrect" })
    } else {
        res.json({
            status: "Ok",
            message: "Login successful",
            data: {
                _id: vendor._id,
                userName: vendor.userName,
                email: vendor.email,
                password: vendor.password,
                token: generateToken(vendor._id),
            },
        })
    }
})