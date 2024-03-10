require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 5050,
  },
  database: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    saltRound: process.env.JWT_SALT_ROUNDS,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  S3: {
    endpoint: process.env.S3_ENDPOINT,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
  },
  mailer: {
    gmail: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export default config;
