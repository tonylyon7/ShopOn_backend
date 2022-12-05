import mongoose from "mongoose"

const vendorSchema = mongoose.Schema({
  email: {type: String},
  userName: {type: String},
  password: {type: String},
})

const Vendor = mongoose.model(Vendor, vendorSchema)

export default Vendor
