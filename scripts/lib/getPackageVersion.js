const fs = require("fs-extra");
const path = require("path");
const { getPackageInfo } = require("./getPackageInfo");
const pkgName = process.argv[2];
const pkgInfo = getPackageInfo(pkgName);
const pkgJsonDir = path.join(
  __dirname,
  "../..",
  pkgInfo.location,
  "package.json"
);
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));
console.log(packageJson.version);
