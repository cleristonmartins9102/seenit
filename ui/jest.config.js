
module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/setupTests.js', '<rootDir>/src/main/config/setupJestDom.ts', 'jest-localstorage-mock'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/data/test'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/data/test',
    '<rootDir>/src/main/index.tsx'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
