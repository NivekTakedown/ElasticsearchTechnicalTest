const request = require('supertest');
const express = require('express');
const userRoutes = require('../../src/routes/userRoutes');
const userService = require('../../src/services/userService');
const { validateSearchParams, validateIndexParams } = require('../../src/middlewares/middlewares');
jest.mock('../../src/services/userService');
jest.mock('../../src/middlewares/middlewares', () => ({
    validateSearchParams: jest.fn((req, res, next) => next()),
    validateIndexParams: jest.fn((req, res, next) => next())
}));
const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const mockUser = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 30,
                address: '123 Main St'
            };

            userService.indexUser.mockResolvedValue({ result: 'created' });

            const response = await request(app)
                .post('/api/users')
                .send({ document: mockUser });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User indexed successfully');
            expect(userService.indexUser).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('GET /api/users/exact-search', () => {
        it('should perform an exact search', async () => {
            const mockResults = [{ name: 'John Doe', email: 'john@example.com' }];
            userService.exactSearchUsers.mockResolvedValue(mockResults);

            const response = await request(app)
                .get('/api/users/exact-search')
                .query({ field: 'name', value: 'John Doe' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('users', mockResults);
            expect(userService.exactSearchUsers).toHaveBeenCalledWith('name', 'John Doe');
        });
    });

    describe('GET /api/users/fuzzy-search', () => {
        it('should perform a fuzzy search', async () => {
            const mockResults = [{ name: 'John Doe', email: 'john@example.com' }];
            userService.fuzzySearchUsers.mockResolvedValue(mockResults);

            const response = await request(app)
                .get('/api/users/fuzzy-search')
                .query({ field: 'name', value: 'Jon', fuzziness: 'AUTO' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('users', mockResults);
            expect(userService.fuzzySearchUsers).toHaveBeenCalledWith('name', 'Jon', 'AUTO');
        });
    });
});