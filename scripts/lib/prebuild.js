// get pkg to build
// get its internal dependancies each under a folder with its own name and set them next to the to-build pkg's package.json
// relativize all imports
// TODO build pkg
// TODO publish
const path = require("path");
const fs = require("fs-extra");
const { relativizeImports } = require("./relativizeImports");
const { updatePackageTypesVersions } = require("./exportPackage");
const { getPackageInfo } = require("./getPackageInfo");

const pkgName = process.argv[2];

function getAllInternalPackages(packageName) {
  const pkgInfo = getPackageInfo(packageName);
  const internalPkgs = pkgInfo.workspaceDependencies;

  const allInternalPkgs = [...internalPkgs];
  internalPkgs.forEach((internalPkg) => {
    const subPackages = getAllInternalPackages(internalPkg);
    allInternalPkgs.push(...subPackages);
  });

  return [...new Set(allInternalPkgs)];
}

const allInternalPkgs = getAllInternalPackages(pkgName);
console.log("got all internal pkgs");

const allInternalPkgsDirs = allInternalPkgs.map((pkgName) => ({
  name: pkgName,
  dir: path.join(__dirname, "../..", getPackageInfo(pkgName).location),
}));
console.log("got all internal pkgs dirs");
const pkgLocation = getPackageInfo(pkgName).location;
console.log("got pkg location");
const pkgDir = path.join(__dirname, "../..", pkgLocation);
console.log("got pkg dir");
// const pkgCopyDir = path.join(__dirname, "package-copy");

// fs.copySync(pkgDir, pkgCopyDir, { overwrite: true });

const packageJsonDir = path.join(pkgDir, "package.json");
console.log("got pkg.json dir");
const cleanUpPackageJson = (pkgName) => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonDir, "utf8"));
  if (!!packageJson.dependencies[pkgName])
    delete packageJson.dependencies[pkgName];
  if (!!packageJson.devDependencies[pkgName])
    delete packageJson.devDependencies[pkgName];

  fs.writeFileSync(packageJsonDir, JSON.stringify(packageJson, null, 2));
};
const updateDependencies = (sourcePackageDir) => {
  const packageJsonSource = JSON.parse(
    fs.readFileSync(sourcePackageDir, "utf8")
  );
  const packageJsonDestination = JSON.parse(
    fs.readFileSync(packageJsonDir, "utf8")
  );

  if (!!packageJsonSource.dependencies) {
    for (key in packageJsonSource.dependencies) {
      if (
        !packageJsonDestination.dependencies[key] &&
        packageJsonSource.dependencies[key] !== "*"
      ) {
        packageJsonDestination.dependencies[key] =
          packageJsonSource.dependencies[key];
      }
    }
    fs.writeFileSync(
      packageJsonDir,
      JSON.stringify(packageJsonDestination, null, 2)
    );
  }
};

const updateDevDependencies = (sourcePackageDir) => {
  const packageJsonSource = JSON.parse(
    fs.readFileSync(sourcePackageDir, "utf8")
  );
  const packageJsonDestination = JSON.parse(
    fs.readFileSync(packageJsonDir, "utf8")
  );

  if (!!packageJsonSource.devDependencies) {
    for (key in packageJsonSource.devDependencies) {
      if (!packageJsonDestination.devDependencies)
        packageJsonDestination.devDependencies = {};
      if (
        !packageJsonDestination.devDependencies[key] &&
        packageJsonSource.devDependencies[key] !== "*"
      ) {
        packageJsonDestination.devDependencies[key] =
          packageJsonSource.devDependencies[key];
      }
    }
    fs.writeFileSync(
      packageJsonDir,
      JSON.stringify(packageJsonDestination, null, 2)
    );
  }
};
allInternalPkgsDirs.forEach((pkg) => {
  const newFolder = path.join(pkgDir, pkg.name.replace("@nizar-repo/", ""));
  fs.ensureDirSync(newFolder);
  const sourceDir = pkg.dir;

  fs.copySync(sourceDir, newFolder, { overwrite: true });
  updateDependencies(path.join(newFolder, "package.json"));
  updateDevDependencies(path.join(newFolder, "package.json"));
});
console.log("got imported all internal pkgs into my pkg");

allInternalPkgsDirs.forEach((pkg) => {
  const newFolder = path.join(pkgDir, pkg.name.replace("@nizar-repo/", ""));
  const deleteFilesAndEmptyDirs = (dirPath) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        deleteFilesAndEmptyDirs(filePath);
        try {
          if (fs.readdirSync(filePath).length === 0) {
            console.log(filePath);
            fs.rmdirSync(filePath);
          }
        } catch (error) {}
      } else if (path.extname(file) !== ".ts" || file.includes("test")) {
        console.log(filePath);
        fs.unlinkSync(filePath);
      }
    });

    if (fs.readdirSync(dirPath).length === 0) {
      console.log(dirPath);
      fs.rmdirSync(dirPath);
    }
  };

  deleteFilesAndEmptyDirs(newFolder);
});
console.log("kept only ts files");

allInternalPkgsDirs.forEach((pkg) => {
  relativizeImports(pkg.name, pkgDir);
});
console.log("relativized imports");
allInternalPkgsDirs.forEach((pkg) => {
  cleanUpPackageJson(pkg.name);
});
console.log("cleaned up pkg json");

updatePackageTypesVersions(pkgDir, packageJsonDir, pkgLocation);
console.log("updated pkg json with publishing data");
console.log(allInternalPkgsDirs);

// fs.removeSync(pkgCopyDir);
module.exports = {
  getPackageInfo,
};
