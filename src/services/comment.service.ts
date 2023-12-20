import Comment from '../database/repositories/comment.repository';
import AppError from '../utils/AppError';

class CommentService {
  static async getAllComments() {
    const comments = await Comment.getAllComments();
    return {
      status: 'success',
      result: comments.length,
      data: {
        comments,
      },
    };
  }

  static async getCommentById(commentId: string) {
    const comment = await Comment.getCommentById(commentId);
    if (!comment) {
      throw new AppError('Comment not found', 404, 'error 👺');
    }
    return {
      status: 'success 😎',
      data: {
        comment,
      },
    };
  }

  static async createComment(commentData: any) {
    const newComment = await Comment.createComment(commentData);
    return {
      status: 'success',
      data: {
        comment: newComment,
      },
    };
  }

  static async updateCommentById(commentId: string, commentData: any) {
    const updatedComment = await Comment.updateCommentById(commentId, commentData);
    if (!updatedComment) {
      throw new AppError('Comment not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: {
        comment: updatedComment,
      },
    };
  }

  static async deleteCommentById(commentId: string) {
    const deletedComment = await Comment.deleteCommentById(commentId);
    if (!deletedComment) {
      throw new AppError('Comment not found', 404, 'error 👺');
    }
    return {
      status: 'success',
      data: null,
    };
  }
}

export default CommentService;
