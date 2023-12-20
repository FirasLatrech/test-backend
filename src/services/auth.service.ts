import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../database/models/usersmodel';
import AppError from '../utils/AppError';
import logger from '../utils/logger';
import { config } from '../config/config';

export class AuthService {
  private static signToken(id: string, expiresIn: string): string {
    return jwt.sign({ id }, process.env.SECRET_TOKEN!, {
      expiresIn,
    });
  }

  public static async register(
    name: string,
    email: string,
    password: string,
    classe: string,
    phone : string
  ): Promise<{ token: string; refreshToken: string; user: UserDocument }> {
    try {
      console.log(User)
      const newUser = await User.create({
        name,
        email,
        password,
        classe,
        phone
      })

      
  
      const token = this.signToken(newUser._id, process.env.JWT_EXPIRES_IN!);
      const refreshToken = this.signToken(newUser._id, process.env.REFRESH_JWT_EXPIRES_IN!);  

      
  
      return {
        token,
        refreshToken,
        user:newUser,
      };
    } catch (error: any) {
      logger.error(`Error registering user: ${error.message}`);
      throw new AppError(`Error registering user : ${error.message}`, 400, 'error');
    }
  }
  

  public static async login(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect email or password', 400, 'fail');
      }

      const token = this.signToken(user._id, process.env.JWT_EXPIRES_IN!);
      const refreshToken = this.signToken(user._id, process.env.REFRESH_JWT_EXPIRES_IN!);

      return {
        token,
        refreshToken,
      };
    } catch (error : any) {
      logger.error(`Error logging in user: ${error.message}`);
      throw new AppError('Error logging in user', 500, 'error');
    }
  }

  public static async refreshToken(refreshToken: string): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, config.database.secretToken!, (err: any, decoded: any) => {
        if (err) {
          reject(new AppError('Invalid refresh token', 401, 'Unauthorized'));
        }

        const newAccessToken = this.signToken(decoded.id, process.env.JWT_EXPIRES_IN!);
        resolve({ token: newAccessToken });
      });
    });
  }

  public static async getMe(token: string) {
    return  new  Promise (async (resolve, reject) => {
      try {
        const decoded = jwt.verify(token, config.database.secretToken!) as UserDocument;
        const user = await User.findById(decoded.id);

        if (!user) {
          reject(new AppError('User not found', 401, 'fail'));
        }

        resolve(user);
      } catch (error : any) {
        logger.error(`Error verifying token: ${error.message}`);
        reject(new AppError('Unauthorized - Invalid token', 401, 'fail'));
      }
    });
  }
}
