import mongoose from 'mongoose';
import Comment from '../models/comment.model';

class CommentRepository {
  // Get all comments
  static async getAllComments() {
    const comments = await Comment.find();
    return comments;
  }

  // Get a comment by ID
  static async getCommentById(commentId: string) {
    const comment = await Comment.findById(commentId);
    return comment;
  }

  // Create a new comment
  static async createComment(commentData: any) {
    const newComment = await Comment.create(commentData);
    return newComment;
  }

  // Update a comment by ID
  static async updateCommentById(commentId: string, commentData: any) {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, commentData, { new: true });
    return updatedComment;
  }

  // Delete a comment by ID
  static async deleteCommentById(commentId: string) {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  }
}

export default CommentRepository;
