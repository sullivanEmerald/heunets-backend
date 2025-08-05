export default () => ({
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5174',
    port: parseInt(process.env.PORT, 10) || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/heunets',
    JWT_SECRET: process.env.JWT_SECRET || 'super-secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    APP_NAME: process.env.APP_NAME || 'Heunets',
    APP_URL: process.env.APP_URL,
});
