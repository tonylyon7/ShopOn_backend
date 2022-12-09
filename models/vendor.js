import mongoose from "mongoose"

const vendorSchema = mongoose.Schema({
        email: { type: String },
        storeName: { type: String },
        password: { type: String },
        img: [
            { type: String },

        ],
        shortDesc: { type: String },
        longDesc: { type: String },
        country: { type: String },
        state: { type: String },
        phoneNumber: { type: String },
        bankName: { type: String },
        accountName: { type: String },
        accountNumber: { type: String },



    }, {
        timestamps: true
    }

)

const Vendor = mongoose.model("Vendor", vendorSchema)

export default Vendor