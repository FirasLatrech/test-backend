import { Request, Response } from 'express';
import MagazineService from '../services/magazine.service';
import catchHandler from 'express-async-handler';

class MagazineController {
  static getAllMagazines = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await MagazineService.getAllMagazines();
    res.status(200).json(result);
  });

  static getMagazineById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await MagazineService.getMagazineById(req.params.magazineId);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static createMagazine = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await MagazineService.createMagazine(req.body);
    res.status(201).json(result);
  });

  static updateMagazineById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await MagazineService.updateMagazineById(req.params.magazineId, req.body);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  });

  static deleteMagazineById = catchHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await MagazineService.deleteMagazineById(req.params.magazineId);
      res.status(204).json(result);
    } catch (error) {
      throw error;
    }
  });
}

export default MagazineController;
