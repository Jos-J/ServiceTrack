// server/src/routes/shop.route.ts
import { Router, type Response } from "express";
import {
    getShop,
    createShop,
    updateShop,
    deleteShop,
} from "../controllers/shop.controller.js"
import { requireAuth } from "../middleware/auth.js";

import type {
    Shop,
    ShopCreateRequest,
    ShopUpdateRequest,
    ShopNested,
    ApiResponse,
} from "../types/api.js"
import router from "./meta.route.js";


// Get
router.get("/", getShop);
router.post("/:id", requireAuth, createShop);
router.put("/id", requireAuth, updateShop);
router.delete("/:id", requireAuth, deleteShop);