'use strict';
const app = require('./app.js')
exports.main_handler = async (event, context, callback) => {
    await app()
}