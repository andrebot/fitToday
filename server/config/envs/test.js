module.exports = {
  PORT: 8000,
  LOG_LEVEL: 'silent',
  SECRET: 'soloShotFirst',
  ISSUER: 'fitToday',
  TOKEN_EXPIRATION: 1440,
  COOKIE_NAME: 'fittoday',
  SALT_WORK_FACTOR: 10,
  DB: {
    URL: process.env.MONGO_URI || 'mongodb://localhost/fittodaytest'
  }
};
