import User, { IUser } from "@/src/database/models/user.model";
import UserRepository from "@/src/database/repositories/user.repository";

// Mock the User model
jest.mock('@/src/database/models/user.model');

describe('UserRepository', () => {
  beforeAll(async () => {
    // Connect to an in-memory database if needed for additional setup
  });

  afterAll(async () => {
    // Clean up after tests if needed
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const mockUser: IUser = { name: 'Test User', email: 'test@example.com' };

      // Mock the save method
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserRepository.createUser(mockUser);

      expect(User.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if save fails', async () => {
      const mockUser: IUser = { name: 'Test User', email: 'test@example.com' };

      // Mock the save method to throw an error
      (User.prototype.save as jest.Mock).mockRejectedValue(new Error('Save failed'));

      await expect(UserRepository.createUser(mockUser)).rejects.toThrow('Save failed');
      expect(User.prototype.save).toHaveBeenCalledTimes(1);
    });
  });
});
