import AppError from "../../utils/AppError";
import Magazine, { MagazineDocument } from "../models/magazine.model";

class MagazineRepository {
  static async getAllMagazines(): Promise<MagazineDocument[]> {
    return Magazine.find();
  }

  static async getMagazineById(MagazineId: string): Promise<MagazineDocument | null> {
    return Magazine.findById(MagazineId);
  }

  static async createMagazine(MagazineData: any): Promise<MagazineDocument> {
    return Magazine.create(MagazineData);
  }

  static async updateMagazineById(MagazineId: string, MagazineData: any): Promise<MagazineDocument | null> {
    return Magazine.findByIdAndUpdate(MagazineId, MagazineData, { new: true });
  }

  static async deleteMagazineById(MagazineId: string): Promise<void> {
    const deletedMagazine = await Magazine.findByIdAndDelete(MagazineId);
    if (!deletedMagazine) {
      throw new AppError('Magazine not found', 404, 'error 👺');
    }
  }
}

export default MagazineRepository;
