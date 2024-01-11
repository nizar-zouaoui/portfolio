const path = require("path");
const fs = require("fs-extra");
const pkgName = process.argv[2];
const updatedVersion = process.argv[3];

const pkgCopyDir = path.join(__dirname, "package-copy");

const pkgJsonDir = path.join(pkgCopyDir, "package.json");
const packageJson = JSON.parse(fs.readFileSync(pkgJsonDir, "utf8"));
packageJson.version = updatedVersion;
fs.writeFileSync(packageJsonDir, JSON.stringify(packageJson, null, 2));

const pkgDir = path.join(__dirname, "../..", getPackageInfo(pkgName).location);
fs.copySync(pkgCopyDir, pkgDir, { overwrite: true });
fs.removeSync(pkgCopyDir);
