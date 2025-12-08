import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getMaintenance = async (req: Request, res: Response) => {
  const records = await prisma.vehiclemaintenance.findMany();
  res.json({ data: records });
};

export const createMaintenance = async (req: Request, res: Response) => {
  const record = await prisma.vehiclemaintenance.create({
    data: req.body,
  });

  res.status(201).json({ data: record });
};

