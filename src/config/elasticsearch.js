const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const path = require('path');
const loadEnvironment = require('./environment');

const env = loadEnvironment();
const createElasticsearchClient = () => {
    return new Client({
        node: env.elasticsearchNode,
        auth: {
            username: env.elasticsearchUsername,
            password: env.elasticsearchPassword
        },
        tls: {
            ca: fs.readFileSync(path.join(__dirname, '../../http_ca.crt')),
            rejectUnauthorized: true
        }
    });
};
module.exports = createElasticsearchClient;