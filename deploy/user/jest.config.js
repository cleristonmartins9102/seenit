const config = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/jest.before.config.js"]
};

module.exports = config;
