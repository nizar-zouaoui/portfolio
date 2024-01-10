const { execSync } = require("child_process");
const pkgName = process.argv[2];
execSync(`yarn run prebuild ${pkgName}`, {
  stdio: "inherit",
});
