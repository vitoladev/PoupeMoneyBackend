export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  restoreMocks: true,
  clearMocks: true,
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).+(ts)'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/build/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
