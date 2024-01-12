const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");
const path = require("path");
const fs = require("fs-extra");

const pkgName = process.argv[2];

const pkgInfo = getPackageInfo(pkgName);
const pkgJsonDir = path.join(__dirname, "..", pkgInfo.location, "package.json");
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));

execSync(
  `cd ${pkgInfo.location} && yarn publish --accesss public --new-version ${packageJson.version}`,
  {
    stdio: "inherit",
  }
);

// execSync(`yarn post-publish ${pkgName} ${newVersion}`, {
//   stdio: "inherit",
// });
