import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor"
        },
        
        productName: {type: String},
        category: {type: String},
        unitPrice:{type: Number},
        qtyInStock:{type: Number},
        discount: {type: Number},
        totalValue: {type: Number},
        status:{
            type: String,
            enum: ["published", "unpublished"],
            default: "published"
        },
        images: [
            {type: String}
        ],
        shortDesc:{type: String},
        longDesc:{type: String}
    },

    {
        timeStamps: true
    }
)

const Item = mongoose.model("Item", itemSchema)
export default Item