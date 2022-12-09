import asyncHandler from "express-async-handler";
import Item from "../models/item.js";
import Vendor from "../models/vendor.js";


export const create_item = asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.vendor.id)
    const {productName, category, unitPrice, qtyInStock, discount, totalValue, images, shortDesc, longDesc} = req.body

    if(vendor){
        const item = await Item.create({
            created_by: req.user.id,
            productName, 
            category,
            unitPrice, 
            qtyInStock, 
            discount, 
            totalValue,
            status: "published", 
            images, 
            shortDesc, 
            longDesc     
        })

        if(item){
            res.json({
                status: "ok",
                message: "Item created successfully",
                data: item
            })
        }else{
            res.json({
                error: "Invalid data inputed"
            })
        }
    }else{
        res.status(400).json({
            error: "Vendor does not exist"
        })
    }
})

export const get_all_items = asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.vendor.id)

    const item = await Item.find({creatyed_by: vendor._id})

    if(vendor && item){
        res.json({
            status: "ok",
            message: "All items gotten",
            data: item
        })
    }else{
        res.json({
            error: "Vendor does not have an item"
        })
    }
})

export const get_single_item = asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.vendor.id)

    const item = await Item.find({created_by: vendor._id, _id: req.params.id})

    if(item){
        res.json({
            status: "ok",
            message: "One item retrieved",
            data: item
        })
    }else{
        res.json({
            error: "This item was not created"
        })
    }
})

export const update_single_item = asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.vendor.id)
    const item = await Item.findOne({created_by: req.params.id})
    const {productName, category ,unitPrice, qtyInStock ,discount, totalValue,  img, shortDesc, longDesc} = req.body
    if(vendor && item){
        item.productName = productName || item.productName
        item.category = category || item.category
        item.unitPrice = unitPrice || item.unitPrice
        item.qtyInStock = qtyInStock || item.qtyInStock
        item.discount = discount || item.discount
        item.totalValue = totalValue || item.totalValue
        item.images = images || item.images
        item.shortDesc = shortDesc || item.shortDesc
        item.longDesc = longDesc || item.longDesc
        
        const updatedItem = await item.save()

        if(updatedItem){
            res.status(201).json({
                status: "ok",
                message: "Item updated successfully",
                data: updatedItem
            })
        }else{
            res.json({
                message: "Something went wrong"
            })
        }
    }else{
        res.json({
            error: "Item does not exist"
        })
    }
})

export const delete_single_item = asyncHandler(async(req, res) =>{
    const vendor = await Vendor.findById(req.user.id)
    const deleted_item = await Item.findByIdAndDelete({_id: req.params.id})
    if(vendor && deleted_item){
        res.status(201).json({
            status: "ok",
            message: "This item has been deleted"
        })
    }else{
        res.json({
            error: "Item not found"
        })
    }
})