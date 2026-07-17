// server/src/routes/meta.route.ts
import { Router, type Request, type Response } from "express";
import type { ApiResponse } from "../types/api.js";

const router = Router();

type MaintenanceMeta = {
  maintTypes: string[];
  statuses: string[];
};

router.get(
  "/maintenance",
  async (_req: Request, res: Response<ApiResponse<MaintenanceMeta>>) => {
    // Matches your DB CHECK constraints exactly
    res.json({
      data: {
        maintTypes: ["preventive", "corrective", "inspection", "customization"],
        statuses: ["inop", "turns over", "runs & drives"],
      },
    });
  }
);

router.get("/", (_req, res) => {
  res.json({ data: { status: "OK" } });
});

export default router;
