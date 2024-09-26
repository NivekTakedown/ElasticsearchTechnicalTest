const createElasticsearchClient = require('../config/elasticsearch');
const User = require('../models/userModel');

class UserRepository {
    constructor() {
        this.client = createElasticsearchClient();
        this.index = 'users';
    }

    async indexUser(user) {
        const document = user.toElasticsearchDocument();
        const result = await this.client.index({
            index: this.index,
            body: document
        });
        return result;
    }

    async findUserById(id) {
        const result = await this.client.get({
            index: this.index,
            id: id
        });
        return User.fromElasticsearchHit(result);
    }

    async searchUsers(query, field, fuzziness = 'AUTO') {
        const result = await this.client.search({
            index: this.index,
            body: {
                query: {
                    fuzzy: {
                        [field]: {
                            value: query,
                            fuzziness: fuzziness
                        }
                    }
                }
            }
        });
        return result.hits.hits.map(hit => User.fromElasticsearchHit(hit));
    }

    async exactSearchUsers(field, value) {
        const result = await this.client.search({
            index: this.index,
            body: {
                query: {
                    term: {
                        [field]: value
                    }
                }
            }
        });
        return result.hits.hits.map(hit => User.fromElasticsearchHit(hit));
    }

    async createIndex() {
        const exists = await this.client.indices.exists({ index: this.index });
        if (!exists) {
            await this.client.indices.create({
                index: this.index,
                body: {
                    mappings: User.getMapping()
                }
            });
        }
    }
}

module.exports = new UserRepository();