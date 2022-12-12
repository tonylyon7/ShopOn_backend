import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor"
        },
        
        productName: {type: String},
        productCategory: {type: String},
        productSubCategory: {type: String},
        unitPrice:{type: Number},
        sellingPrice: {type: Number},
        costPrice: {type: Number},
        qtyInStock:{type: Number},
        orderType: {type: String},
        variationType: [
            {type: String}
        ],
        discount: {type: Number},
        status:{
            type: String,
            enum: ["published", "unpublished"],
            default: "published"
        },
        mainImg: {type: String},
        addedImages: [
            {type: String}
        ],
        color: [
            {type: String}
        ],
        shortDesc:{type: String},
        longDesc:{type: String},
    },

    {
        timeStamps: true
    }
)

const Item = mongoose.model("Item", itemSchema)
export default Item