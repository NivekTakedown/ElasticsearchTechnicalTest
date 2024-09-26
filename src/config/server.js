const express = require('express');

function configureServer() {
    const app = express();
    app.use(express.json());
    return app;
}

module.exports = configureServer;