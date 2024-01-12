const fs = require("fs-extra");
const path = require("path");
const { getPackageInfo } = require("./getPackageInfo");
const pkgName = process.argv[2];
const token = process.argv[3];

const pkgInfo = getPackageInfo(pkgName);

const pkgDir = path.join(__dirname, "../..", pkgInfo.location);

const npmrcContent = `//registry.npmjs.org/:_authToken=${token}`;
const npmrcFilePath = path.join(pkgDir, ".npmrc");

// Write the content to the .npmrc file
fs.writeFileSync(npmrcFilePath, npmrcContent);
