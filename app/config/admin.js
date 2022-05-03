module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'my-secret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'my-salt'),
  },
});
