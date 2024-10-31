export const COOKIES = {
  jwt: {
    key: 'jwt',
    duration: 3600 * 24, // 24 hours,
  },
  passwordResetToken: {
    key: 'passwordResetToken',
    duration: 3600 / 2, // 30 minutes,
  },
}
