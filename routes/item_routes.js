import express  from "express";
import { create_item, delete_single_item, get_all_items, get_single_item, update_single_item } from "../controllers/itemController.js";
import { vendorProtect } from "../middlewares/auth-handler.js";


const item_router = express.Router()

item_router.route("/")
    .post(vendorProtect, create_item)
    .get(vendorProtect, get_all_items)
item_router.route("/:id")
    .get(vendorProtect, get_single_item)
    .patch(vendorProtect, update_single_item)
    .delete(vendorProtect, delete_single_item)


export default item_router