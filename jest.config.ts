import nextJest from 'next/jest.js'
import { Config } from 'jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  // transformIgnorePatterns: ['node_modules/(?!(.*(mdx).*)/?)'],
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\.md(x)?$': '<rootDir>/src/app/_testutils/GlobalMarkdownImport.tsx',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
