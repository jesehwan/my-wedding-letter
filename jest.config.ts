import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        jsx: "react-jsx",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^three$": "<rootDir>/__mocks__/three.ts",
    "^@react-three/fiber$": "<rootDir>/__mocks__/@react-three/fiber.tsx",
    "^@react-three/drei$": "<rootDir>/__mocks__/@react-three/drei.tsx",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
};

export default config;
