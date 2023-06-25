module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/bitfilmsdb',
  port: process.env.PORT || '3000',
};
