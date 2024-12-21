import { Request, Response } from "express";

export interface Rest {
  getOne(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  insert(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
