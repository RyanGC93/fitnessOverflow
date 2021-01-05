const csurf = require('csurf');

const csrfProtection = csurf({ cookie: true })

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = { csrfProtection, asyncHandler };