export default {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: '<rootDir>/src/config/dot-env-config.ts',
};
