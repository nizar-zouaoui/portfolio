const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");
const path = require("path");
const fs = require("fs-extra");
const { getNewVersion } = require("./lib/bumpVersion");

const pkgName = process.argv[2];
const versionUpdate = process.argv[3];
if (!["patch", "minor", "major"].includes(versionUpdate)) {
  console.log("Version bump was not provided");
  process.exit(1);
}

const pkgInfo = getPackageInfo(pkgName);
execSync(`yarn build:package ${pkgName}`, {
  stdio: "inherit",
});
const pkgJsonDir = path.join(__dirname, "..", pkgInfo.location, "package.json");
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));
const newVersion = getNewVersion(versionUpdate, packageJson.version);

execSync(
  `cd ${pkgInfo.location} && yarn publish --accesss public --new-version ${newVersion}`,
  {
    stdio: "inherit",
  }
);

// execSync(`yarn post-publish ${pkgName} ${newVersion}`, {
//   stdio: "inherit",
// });
