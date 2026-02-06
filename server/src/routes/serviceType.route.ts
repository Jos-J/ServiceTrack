import { Router } from "express";
import {
  getServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deactivateServiceType,
} from "../controllers/serviceType.controller.js";

const router = Router();

// GET /service-types?active=true
router.get("/", getServiceTypes);

// GET /service-types/:id
router.get("/:id", getServiceTypeById);

// POST /service-types
router.post("/", createServiceType);

// PUT /service-types/:id
router.put("/:id", updateServiceType);

// DELETE /service-types/:id  (soft deactivate)
router.delete("/:id", deactivateServiceType);

export default router;
