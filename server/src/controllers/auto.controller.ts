import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAutos = async (req: Request, res: Response) => {
  const autos = await prisma.auto.findMany();
  res.json({ data: autos });
};

export const getAutoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const auto = await prisma.auto.findUnique({ where: { vin_id: id } });

  if (!auto) return res.status(404).json({ error: 'Auto not found' });

  res.json({ data: auto });
};

export const createAuto = async (req: Request, res: Response) => {
  const auto = await prisma.auto.create({
    data: req.body,
  });

  res.status(201).json({ data: auto });
};
