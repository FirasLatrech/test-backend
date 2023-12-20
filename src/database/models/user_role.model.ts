// models/user_role.model.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface User_RoleDocument extends Document {
  userId: string;
  roleId: string;
}

interface User_RoleModel extends Model<User_RoleDocument> {}

const user_roleSchema = new Schema<User_RoleDocument, User_RoleModel>(
  {
    userId: {
      type: String,
      required: [true, 'A user role must have a user ID'],
    },
    roleId: {
      type: String,
      required: [true, 'A user role must have a role ID'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User_Role = mongoose.model<User_RoleDocument, User_RoleModel>('User_Role', user_roleSchema);

export default User_Role;
