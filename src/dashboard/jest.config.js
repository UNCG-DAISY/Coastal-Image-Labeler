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
  moduleNameMapper: {
    '^@/models/(.*)': '<rootDir>/server/models/$1',
    '^@/server/(.*)': '<rootDir>/server/$1',
    '^@/utils/(.*)': '<rootDir>/server/utils/$1',
    '^@/routes/(.*)': '<rootDir>/server/routes/$1',
    '^@/middlewares/(.*)': '<rootDir>/server/middlewares/$1',
    '^@/controllers/(.*)': '<rootDir>/server/controllers/$1',
    '^@/data/(.*)': '<rootDir>/data/$1',
    '@/interfaces/(.*)': '<rootDir>/interfaces/$1',
  },
}
