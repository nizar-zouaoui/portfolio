const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");

const pkgName = process.argv[2];

const pkgInfo = getPackageInfo(pkgName);

execSync(`cd ${pkgInfo.location} && yarn publish-package`, {
  stdio: "inherit",
});
