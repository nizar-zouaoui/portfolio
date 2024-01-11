const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");
const path = require("path");

const pkgName = process.argv[2];
const versionUpdate = process.argv[3];
if (!["patch", "minor", "major"].includes(versionUpdate)) {
  console.log("Version bump was not provided");
  process.exit(1);
}

const pkgInfo = getPackageInfo(pkgName);
execSync(
  `yarn build:package ${pkgName} && cd ${pkgInfo.location} && yarn version --${versionUpdate}`,
  {
    stdio: "inherit",
  }
);
const pkgJsonDir = path.join(__dirname, "..", pkgInfo.location, "package.json");
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));

execSync(
  `cd ${pkgInfo.location} && yarn publish --accesss public --new-version ${packageJson.version}`,
  {
    stdio: "inherit",
  }
);
