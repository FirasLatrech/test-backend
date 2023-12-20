import crypto from 'crypto';
import mongoose, { Document, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Interface for User Document
export interface UserDocument extends Document {
  name: string;
  email: string;
  photo: string;
  classe:string;
  phone: string;
  role: 'user' | 'teacher' | 'admin' | 'superadmin';
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;

  correctPassword(loginPass: string, userPass: string): Promise<boolean>;
  isPasswordChanged(JWTtimeStamp: number): boolean;
  createPasswordResetToken(): string;
}

// Interface for User Model (Static Methods)
interface UserModel extends Model<UserDocument> {}

// User Schema
const userSchema = new Schema<UserDocument, UserModel>(
  {
    // -------------------------- Basics --------------------------
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    phone:{
      type: String,
      required: [true, 'A user must have a Number'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    classe : {
      type : String,
      required: [true, 'A user must have a classe'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'teacher', 'admin', 'superadmin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: 8,
      select: false,
    },
    
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    // -------------------------- Options --------------------------
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// -------------------------- Instance Methods --------------------------
// Check if the password is correct
userSchema.methods.correctPassword = async function (
  this: UserDocument,
  loginPass: string,
  userPass: string
) {
  const user :any = await this.model('User').findById(this._id).select('+password');
  if (!user) {
    return;
  }
  return await bcrypt.compare(loginPass, user?.password);
};
// Check if the password was changed after the token was issued
userSchema.methods.isPasswordChanged = function (this: UserDocument, JWTtimeStamp: number) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
    return JWTtimeStamp < changedTimeStamp;
  }
  return false;
};

// Create a password reset token and password reset expire at for each user and store it in the database
userSchema.methods.createPasswordResetToken = function (this: UserDocument) {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};
// -------------------------- Managing Password --------------------------
// Encrypt the password before saving it to the database
userSchema.pre('save', async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field

  next();
});
// -------------------------- Model --------------------------
// User Model
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
