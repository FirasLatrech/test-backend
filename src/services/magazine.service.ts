import Magazine from '../database/repositories/magazine.repository';
import AppError from '../utils/AppError';

class MagazineService {
  static async getAllMagazines() {
    const magazines = await Magazine.getAllMagazines();
    return {
      status: 'success',
      result: magazines.length,
      data: {
        magazines,
      },
    };
  }

  static async getMagazineById(magazineId: string) {
    const magazine = await Magazine.getMagazineById(magazineId);
    if (!magazine) {
      throw new AppError('Magazine not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        magazine,
      },
    };
  }

  static async createMagazine(magazineData: any) {
    const newMagazine = await Magazine.createMagazine(magazineData);
    return {
      status: 'success',
      data: {
        magazine: newMagazine,
      },
    };
  }

  static async updateMagazineById(magazineId: string, magazineData: any) {
    const updatedMagazine = await Magazine.updateMagazineById(magazineId, magazineData);
    if (!updatedMagazine) {
      throw new AppError('Magazine not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        magazine: updatedMagazine,
      },
    };
  }

  static async deleteMagazineById(magazineId: string) {
    const deletedMagazine = await Magazine.deleteMagazineById(magazineId);
  
    return {
      status: 'success',
      data: null,
    };
  }
}

export default MagazineService;
