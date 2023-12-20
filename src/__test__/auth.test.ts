import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User, { UserDocument } from '../database/models/usersmodel';

describe('User Model', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user and encrypt the password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
      classe: 'SomeClass', // Make sure to include the classe field
    };
    
    const newUser = await User.create(userData);

    // Check if the user has been created
    const savedUser = await User.findById(newUser._id) as UserDocument;
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe(userData.name);
    expect(savedUser?.email).toBe(userData.email);

    // Check if the password is encrypted
    expect(savedUser?.password).not.toBe(userData.password);

    // Check if the correctPassword method works
    const isPasswordCorrect = await savedUser?.correctPassword(userData.password, savedUser.password);
    expect(isPasswordCorrect).toBe(true);
  });
});
