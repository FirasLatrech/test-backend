import { Request, Response } from 'express';
import CommentService from '../services/comment.service';
import catchHandler from 'express-async-handler';

class CommentController {
  static getAllComments = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await CommentService.getAllComments();
    res.status(200).json(result);
  });

  static getCommentById = catchHandler(async (req: Request, res: Response): Promise<void> => {
      const result = await CommentService.getCommentById(req.params.commentId);
      res.status(200).json(result);
  
  });

  static createComment = catchHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await CommentService.createComment(req.body);
    res.status(201).json(result);
  });

  static updateCommentById = catchHandler(async (req: Request, res: Response): Promise<void> => {
      const result = await CommentService.updateCommentById(req.params.commentId, req.body);
      res.status(200).json(result);
  });

  static deleteCommentById = catchHandler(async (req: Request, res: Response): Promise<void> => {
      const result = await CommentService.deleteCommentById(req.params.commentId);
      res.status(204).json(result);
    
  });
}

export default CommentController;
