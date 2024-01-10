const { execSync } = require("child_process");
const pkgName = process.argv[2];
console.log(process.argv);
console.log("first");
execSync(
  `yarn run pre-build:package ${pkgName} && yarn build --filter=${pkgName}`,
  {
    stdio: "inherit",
  }
);
