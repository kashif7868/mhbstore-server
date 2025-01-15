const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    ROOT_PATH: Joi.string(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(90).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google OAuth client ID'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google OAuth client secret'),
    GOOGLE_REDIRECT_URI: Joi.string().required().description('Google OAuth redirect URI'),
    FACEBOOK_CLIENT_ID: Joi.string().required().description('Facebook App ID'),
    FACEBOOK_CLIENT_SECRET: Joi.string().required().description('Facebook App Secret'),
    FACEBOOK_CALLBACK_URL: Joi.string().required().description('Facebook OAuth callback URL'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  rootPath: envVars.ROOT_PATH,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    redirectUri: envVars.GOOGLE_REDIRECT_URI,
  },
  facebook: {
    clientId: envVars.FACEBOOK_CLIENT_ID,
    clientSecret: envVars.FACEBOOK_CLIENT_SECRET,
    callbackUrl: envVars.FACEBOOK_CALLBACK_URL,
  },
};
