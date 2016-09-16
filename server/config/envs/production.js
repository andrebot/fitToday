module.exports = {
  PORT: 8000,
  LOG_LEVEL: 'info',
  SECRET: 'akjshda98da9susfnasdNouoiDFSDooiuo9889fsAsdAASd879Asd79',
  ISSUER: 'fitToday',
  TOKEN_EXPIRATION: 1440,
  COOKIE_NAME: 'fittoday',
  SALT_WORK_FACTOR: 10,
  DB: {
    URL: process.env.MONGO_URI || 'mongodb://localhost/fittodayProd',
    OPTIONS: {
      server: {
        reconnectTries: 10
      }
    }
  }
};
