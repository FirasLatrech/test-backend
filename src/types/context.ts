import { Request, Response } from "express";
import { ChapterDocument } from "../database/models/chapter.model";

interface Context {
  req: Request;
  res: Response;
  user: ChapterDocument | null;
}

export default Context;