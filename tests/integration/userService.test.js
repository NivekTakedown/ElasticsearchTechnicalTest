const userService = require('../../src/services/userService');
const UserRepository = require('../../src/repositories/userRepository');

// Mock del UserRepository
jest.mock('../../src/repositories/userRepository');

describe('UserService', () => {
    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();
    });

    describe('indexUser', () => {
        it('should index a valid user', async () => {
            const mockUser = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 30,
                address: '123 Main St'
            };

            UserRepository.indexUser.mockResolvedValue({ result: 'created' });

            const result = await userService.indexUser(mockUser);

            expect(result).toEqual({ result: 'created' });
            expect(UserRepository.indexUser).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should throw an error for invalid user data', async () => {
            const invalidUser = {
                name: 'John Doe'
                // Missing required fields
            };

            await expect(userService.indexUser(invalidUser)).rejects.toThrow();
        });
    });

    describe('exactSearchUsers', () => {
        it('should perform an exact search', async () => {
            const mockResults = [{ name: 'John Doe', email: 'john@example.com' }];
            UserRepository.exactSearchUsers.mockResolvedValue(mockResults);

            const results = await userService.exactSearchUsers('name', 'John Doe');

            expect(results).toEqual(mockResults);
            expect(UserRepository.exactSearchUsers).toHaveBeenCalledWith('name', 'John Doe');
        });
    });

    describe('fuzzySearchUsers', () => {
        it('should perform a fuzzy search', async () => {
            const mockResults = [{ name: 'John Doe', email: 'john@example.com' }];
            UserRepository.searchUsers.mockResolvedValue(mockResults);

            const results = await userService.fuzzySearchUsers('name', 'Jon', 'AUTO');

            expect(results).toEqual(mockResults);
            expect(UserRepository.searchUsers).toHaveBeenCalledWith('Jon', 'name', 'AUTO');
        });
    });
});