const dotenv = require('dotenv');

const loadEnvironment = () => {
    dotenv.config();

    const requiredEnvVars = [
        'ELASTICSEARCH_NODE',
        'ELASTICSEARCH_USERNAME',
        'ELASTICSEARCH_PASSWORD',
        'PORT'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }

    return {
        elasticsearchNode: process.env.ELASTICSEARCH_NODE,
        elasticsearchUsername: process.env.ELASTICSEARCH_USERNAME,
        elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
        port: process.env.PORT || 3000,
        nodeEnv: process.env.NODE_ENV || 'development'
    };
};

module.exports = loadEnvironment;