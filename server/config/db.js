const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
let dbURI;

switch (env) {
  case 'development':
    dbURI = process.env.MONGODB_URI_DEV;
    break;
  case 'release':
    dbURI = process.env.MONGODB_URI_RELEASE;
    break;
  case 'production':
    dbURI = process.env.MONGODB_URI_PROD;
    break;
  default:
    throw new Error('Unknown environment');
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to ${env} database`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
