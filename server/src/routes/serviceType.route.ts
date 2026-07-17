//server/src/routes/serviceType.route

import { Router } from "express";
import {
  getServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deactivateServiceType,
} from "../controllers/serviceType.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// public
router.get("/", getServiceTypes);
router.get("/:id", getServiceTypeById);

// protected
router.post("/", requireAuth, createServiceType);
router.put("/:id", requireAuth, updateServiceType);
router.delete("/:id", requireAuth, deactivateServiceType);

export default router;
