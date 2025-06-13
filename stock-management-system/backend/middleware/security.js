const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

exports.securityHeaders = helmet();

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

exports.corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
