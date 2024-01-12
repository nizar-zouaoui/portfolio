const fs = require("fs-extra");
const path = require("path");
const { getPackageInfo } = require("./getPackageInfo");
const pkgName = process.argv[2];
const versionUpdate = process.argv[3];

const getNewVersion = (versionUpdate, currVersion) => {
  const [major, minor, patch] = currVersion.split(".");
  if (versionUpdate === "major") return `${Number(major) + 1}.0.0`;
  if (versionUpdate === "minor") return `${major}.${Number(minor) + 1}.0`;
  return `${major}.${minor}.${Number(patch) + 1}`;
};

const pkgInfo = getPackageInfo(pkgName);
const pkgJsonDir = path.join(
  __dirname,
  "../..",
  pkgInfo.location,
  "package.json"
);
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));
const currVersion = packageJson.version;
const newVersion = getNewVersion(versionUpdate, currVersion);
packageJson.version = newVersion;
fs.writeFileSync(pkgJsonDir, JSON.stringify(packageJson, null, 2));

console.log(`${pkgName}'s version bumped from ${currVersion} to ${newVersion}`);
