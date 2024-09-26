const validateSearchParams = (req, res, next) => {
    const { index, field, value } = req.query;
    if (!index || !field || !value) {
        return res.status(400).json({ error: 'Missing required search parameters' });
    }
    next();
};

const validateIndexParams = (req, res, next) => {
    const { index, document } = req.body;
    if (!index || !document) {
        return res.status(400).json({ error: 'Missing required index parameters' });
    }
    next();
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'Resource not found' });
};

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

module.exports = {
    validateSearchParams,
    validateIndexParams,
    errorHandler,
    notFoundHandler,
    logRequest
};