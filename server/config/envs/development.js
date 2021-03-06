module.exports = {
  PORT: 8000,
  LOG_LEVEL: 'silly',
  SECRET: 'soloShotFirst',
  ISSUER: 'fitToday',
  TOKEN_EXPIRATION: 1440,
  COOKIE_NAME: 'fittoday',
  SALT_WORK_FACTOR: 10,
  DB: {
    URL: process.env.MONGO_URI || 'mongodb://localhost/fittoday',
    OPTIONS: {
      server: {
        reconnectTries: 10
      }
    }
  }
};
