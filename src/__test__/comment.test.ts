import { NextFunction, Request, Response } from 'express';
import Comment from '../database/models/comment.model';
import CommentController from '../controller/comment.controller';
import AppError from '../utils/AppError';

// Mocking the Comment model
jest.mock('../database/models/comment.model');

describe('CommentController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all comments', async () => {
    const mockComments = [{ _id: '1', commentText: 'Comment 1' }];
    (Comment.find as jest.Mock).mockResolvedValueOnce(mockComments);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;


    await CommentController.getAllComments(req, res ,next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: mockComments.length,
      data: {
        comments: mockComments,
      },
    });
  });

  it('should handle errors when getting all comments', async () => {
    const errorMessage = 'Database error';
    (Comment.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CommentController.getAllComments(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 500, 'error 👺'));
  });

  it('should get a comment by ID', async () => {
    const mockComment = { _id: '1', commentText: 'Comment 1' };
    (Comment.findById as jest.Mock).mockResolvedValueOnce(mockComment);

    const req = { params: { commentId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;


    await CommentController.getCommentById(req, res,next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success 😎',
      data: {
        comment: mockComment,
      },
    });
  });

  it('should handle errors when getting a comment by ID', async () => {
    const errorMessage = 'Comment not found';
    (Comment.findById as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { commentId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CommentController.getCommentById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should create a comment', async () => {
    const req = { body: { commentText: 'New Comment' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const newComment = { _id: '2', commentText: 'New Comment' };
    (Comment.create as jest.Mock).mockResolvedValueOnce(newComment);
    const next = jest.fn() as unknown as NextFunction;

    await CommentController.createComment(req, res,next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  });

  it('should handle errors when creating a comment', async () => {
    const errorMessage = 'Invalid comment data';
    (Comment.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { commentText: 'New Comment' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CommentController.createComment(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 400, 'error 👺'));
  });

  it('should update a comment by ID', async () => {
    const req = { params: { commentId: '1' }, body: { commentText: 'Updated Comment' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedComment = { _id: '1', commentText: 'Updated Comment' };
    (Comment.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedComment);
    const next = jest.fn() as unknown as NextFunction;

    await CommentController.updateCommentById(req, res ,next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        comment: updatedComment,
      },
    });
  });

  it('should handle errors when updating a comment by ID', async () => {
    const errorMessage = 'Comment not found';
    (Comment.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { commentId: '1' }, body: { commentText: 'Updated Comment' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CommentController.updateCommentById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });

  it('should delete a comment by ID', async () => {
    const req = { params: { commentId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const deletedComment = { _id: '1', commentText: 'Deleted Comment' };
    (Comment.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedComment);
    const next = jest.fn() as unknown as NextFunction;

    await CommentController.deleteCommentById(req, res ,next);

    expect(res.status).toHaveBeenCalledWith(204);
    // expect(res.send).toHaveBeenCalled();
  });

  it('should handle errors when deleting a comment by ID', async () => {
    const errorMessage = 'Comment not found';
    (Comment.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const req = { params: { commentId: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    await CommentController.deleteCommentById(req, res, next);

    expect(next).toHaveBeenCalledWith(new AppError(errorMessage, 404, 'error 👺'));
  });
});
