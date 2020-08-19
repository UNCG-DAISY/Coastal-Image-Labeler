module.exports = {
  //Where our test typescript files are
  roots: [
    // "<rootDir>/src",
    //"<rootDir>/server",
    '<rootDir>/tests',
  ],
  //glob pattern matcher for discovering .test / .spec files in ts / tsx / js format
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  //tells jest to use ts-jest for typescript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  //https://mongoosejs.com/docs/jest.html
  testEnvironment: 'node',
}
