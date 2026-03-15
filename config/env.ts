
export const env = {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',
    username: process.env.TEST_EMAIL || 'defaultUser',
    password: process.env.TEST_PASSWORD || 'defaultPassword',
    invalidUsername: process.env.TEST_INVALID_EMAIL || 'invalidUser',
    invalidPassword: process.env.TEST_INVALID_PASSWORD || 'invalidPassword'
};