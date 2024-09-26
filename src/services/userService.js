const userRepository = require('../repositories/userRepository');
const User = require('../models/userModel');

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }

    async indexUser(userData) {
        const errors = User.validate(userData);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        const user = new User(null, userData.name, userData.email, userData.age, userData.address);
        return await this.userRepository.indexUser(user);
    }

    async exactSearchUsers(field, value) {
        if (!field || !value) {
            throw new Error('Field and value are required for exact search');
        }
        return await this.userRepository.exactSearchUsers(field, value);
    }

    async fuzzySearchUsers(field, value, fuzziness = 'AUTO') {
        if (!field || !value) {
            throw new Error('Field and value are required for fuzzy search');
        }
        return await this.userRepository.searchUsers(value, field, fuzziness);
    }

    async initializeIndex() {
        await this.userRepository.createIndex();
    }
}

module.exports = new UserService();