const userService = require('../services/userService');

exports.indexDocument = async (req, res) => {
    try {
        const { document } = req.body;
        const result = await userService.indexUser(document);
        res.status(201).json({
            message: 'User indexed successfully',
            result: result
        });
    } catch (error) {
        console.error('Error indexing user:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.exactSearch = async (req, res) => {
    try {
        const { field, value } = req.query;
        const users = await userService.exactSearchUsers(field, value);
        res.status(200).json({
            message: 'Exact search completed',
            users: users
        });
    } catch (error) {
        console.error('Error in exact search:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.fuzzySearch = async (req, res) => {
    try {
        const { field, value, fuzziness } = req.query;
        const users = await userService.fuzzySearchUsers(field, value, fuzziness);
        res.status(200).json({
            message: 'Fuzzy search completed',
            users: users
        });
    } catch (error) {
        console.error('Error in fuzzy search:', error);
        res.status(400).json({ error: error.message });
    }
};