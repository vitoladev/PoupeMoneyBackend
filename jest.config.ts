export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  restoreMocks: true,
  clearMocks: true,
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@core(.*)$': '<rootDir>/src/core$1',
    '^@graphql(.*)$': '<rootDir>/src/graphql$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
  },
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).+(ts)'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/build/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
