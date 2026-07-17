//server/src/controller/serviceType.controller
import { Request, Response } from "express";
import { prisma} from "..//prisma.js";



const selectServiceType = {
  servicetype_id: true,
  servicename: true,
  servicecategory: true,
  description: true,
  isactive: true,
};

export const getServiceTypes = async (req: Request, res: Response) => {
  try {
    const activeParam = req.query.active;
    const active =
      typeof activeParam === "string"
        ? activeParam.toLowerCase() === "true"
        : undefined;

    const data = await prisma.servicetype.findMany({
      where: active === undefined ? undefined : { isactive: active },
      orderBy: [{ servicecategory: "asc" }, { servicename: "asc" }],
      select: selectServiceType,
    });

    return res.status(200).json({ data });
  } catch {
    return res.status(500).json({
      data: null as any,
      errors: ["Failed to fetch service types."],
    });
  }
};

export const getServiceTypeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        data: null as any,
        errors: ["Invalid id."],
      });
    }

    const data = await prisma.servicetype.findUnique({
      where: { servicetype_id: id },
      select: selectServiceType,
    });

    if (!data) {
      return res.status(404).json({
        data: null as any,
        errors: ["Service type not found."],
      });
    }

    return res.status(200).json({ data });
  } catch {
    return res.status(500).json({
      data: null as any,
      errors: ["Failed to fetch service type."],
    });
  }
};

export const createServiceType = async (req: Request, res: Response) => {
  try {
    const { servicename, servicecategory, description, isactive, createdby } =
      req.body ?? {};

    if (!servicename || !servicecategory || !createdby) {
      return res.status(400).json({
        data: null as any,
        errors: [
          "servicename, servicecategory, and createdby are required.",
        ],
      });
    }

    const data = await prisma.servicetype.create({
      data: {
        servicename: String(servicename).trim(),
        servicecategory: String(servicecategory).trim(),
        description: description ?? null,
        isactive: isactive ?? true,
        createdby: String(createdby).trim(),
      },
      select: selectServiceType,
    });

    return res.status(201).json({
      data,
      message: "Service type created.",
    });
  } catch {
    return res.status(500).json({
      data: null as any,
      errors: ["Failed to create service type."],
    });
  }
};

export const updateServiceType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        data: null as any,
        errors: ["Invalid id."],
      });
    }

    const { servicename, servicecategory, description, isactive } =
      req.body ?? {};

    const exists = await prisma.servicetype.findUnique({
      where: { servicetype_id: id },
      select: { servicetype_id: true },
    });

    if (!exists) {
      return res.status(404).json({
        data: null as any,
        errors: ["Service type not found."],
      });
    }

    const data = await prisma.servicetype.update({
      where: { servicetype_id: id },
      data: {
        servicename:
          servicename === undefined ? undefined : String(servicename).trim(),
        servicecategory:
          servicecategory === undefined
            ? undefined
            : String(servicecategory).trim(),
        description: description === undefined ? undefined : description,
        isactive: isactive === undefined ? undefined : Boolean(isactive),
      },
      select: selectServiceType,
    });

    return res.status(200).json({
      data,
      message: "Service type updated.",
    });
  } catch {
    return res.status(500).json({
      data: null as any,
      errors: ["Failed to update service type."],
    });
  }
};

export const deactivateServiceType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        data: null as any,
        errors: ["Invalid id."],
      });
    }

    const exists = await prisma.servicetype.findUnique({
      where: { servicetype_id: id },
      select: { servicetype_id: true },
    });

    if (!exists) {
      return res.status(404).json({
        data: null as any,
        errors: ["Service type not found."],
      });
    }

    const data = await prisma.servicetype.update({
      where: { servicetype_id: id },
      data: { isactive: false },
      select: selectServiceType,
    });

    return res.status(200).json({
      data,
      message: "Service type deactivated.",
    });
  } catch {
    return res.status(500).json({
      data: null as any,
      errors: ["Failed to deactivate service type."],
    });
  }
};
