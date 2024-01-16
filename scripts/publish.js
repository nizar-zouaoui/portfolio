const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");
const path = require("path");
const fs = require("fs-extra");

const pkgName = process.argv[2];

execSync(`yarn build:package ${pkgName}`, {
  stdio: "inherit",
});

const pkgInfo = getPackageInfo(pkgName);
const pkgJsonDir = path.join(__dirname, "..", pkgInfo.location, "package.json");
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));
execSync(
  `echo "//registry.npmjs.org/:_authToken=${
    process.env.NPM_TOKEN
  }" > ${path.join(__dirname, "..", pkgInfo.location, ".npmrc")}`
);
execSync(
  `cd ${pkgInfo.location} && yarn publish --access public --new-version ${packageJson.version}`,
  {
    stdio: "inherit",
  }
);
execSync(`rm -f ${path.join(__dirname, "..", pkgInfo.location, ".npmrc")}`);

// execSync(`yarn post-publish ${pkgName} ${newVersion}`, {
//   stdio: "inherit",
// });
