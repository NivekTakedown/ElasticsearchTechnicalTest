class User {
    constructor(id, name, email, age, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.address = address;
    }

    static fromElasticsearchHit(hit) {
        const source = hit._source;
        return new User(
            hit._id,
            source.name,
            source.email,
            source.age,
            source.address
        );
    }

    toElasticsearchDocument() {
        return {
            name: this.name,
            email: this.email,
            age: this.age,
            address: this.address
        };
    }

    static getMapping() {
        return {
            properties: {
                name: { type: 'text' },
                email: { type: 'keyword' },
                age: { type: 'integer' },
                address: { type: 'text' }
            }
        };
    }

    static validate(userData) {
        const errors = [];
        if (!userData.name) errors.push('Name is required');
        if (!userData.email) errors.push('Email is required');
        if (typeof userData.age !== 'number') errors.push('Age must be a number');
        if (!userData.address) errors.push('Address is required');
        return errors;
    }
}

module.exports = User;