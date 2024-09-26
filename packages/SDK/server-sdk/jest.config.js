module.exports = {
  ...require("@edonec/config/jest/jest-express"),
  rootDir: ".",
  collectCoverageFrom: ["!(coverage)/*.{js,ts,jsx,tsx}"],
};
