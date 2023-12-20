const DATABASE_URL = "mongodb://localhost:27017/ostedhy"
const MYDATABASE = {
  PORT : 3000,
  DATABASE_URL : DATABASE_URL,
  secretToken :"firaslatrach---firas---latrach",
  JWT_EXPIRES_IN : "1h",
  REFRECH_JWT_EXPIRES_IN : "1y",
  googleClientId : '687218387117-kbdo10572r9ucfveclcme5san9oscq3j.apps.googleusercontent.com',
  googleClientSecret :"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",
  googelOauthRedirectUrl : 'http://localhost:1337/api/v0/auth/google'
}
export const config = {
  database: MYDATABASE,
};




