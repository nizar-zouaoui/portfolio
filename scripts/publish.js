const { execSync } = require("child_process");
const { getPackageInfo } = require("./lib/getPackageInfo");

const pkgName = process.argv[2];

const pkgInfo = getPackageInfo(pkgName);

execSync(
  `yarn build:package ${pkgName} && cd ${pkgInfo.location} && yarn publish-package`,
  {
    stdio: "inherit",
  }
);
