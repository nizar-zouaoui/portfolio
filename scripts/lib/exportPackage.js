const fs = require("fs");
const path = require("path");

function getTsFiles(folderPath) {
  const files = [];

  function traverseDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverseDirectory(itemPath);
      } else if (stats.isFile() && path.extname(item) === ".ts") {
        files.push(itemPath);
      }
    }
  }

  traverseDirectory(folderPath);
  return files;
}
function updatePackageTypesVersions(folderPath, packageJsonPath) {
  const tsFiles = getTsFiles(folderPath);
  const dtsExportPaths = tsFiles
    .map((file) =>
      file
        .replace(`${folderPath}\\index.ts`, "")
        .replace(`${folderPath}\\`, "")
        .replace(".ts", "")
        .replace(/\\/g, "/")
    )
    .filter((file) => !!file.length);
  console.log(dtsExportPaths);
  const packageData = fs.readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageData);
  packageJson.files = ["build/cjs", "build/esm", "build/@types"];
  packageJson.types = "build/@types";
  packageJson.main = "build/cjs/index.js";
  packageJson.module = "build/mjs/index.js";
  packageJson.typesVersions = getTypesVersions(dtsExportPaths);
  packageJson.exports = getExports(dtsExportPaths);
  console.log(packageJson.typesVersions);
  console.log(packageJson.exports);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("Package.json updated successfully!");
}

const getExports = (files) => {
  const exports = {
    ".": {
      require: "./build/cjs/index.js",
      import: "./build/esm/index.js",
    },
  };
  files.forEach((file) => {
    console.log(file);
    exports[`./${file.replace("/index", "")}`] = {
      require: `./build/cjs/${file}.js`,
      import: `./build/esm/${file}.js`,
    };
  });
  return exports;
};

const getTypesVersions = (files) => {
  const typesVersion = {
    ">=4": {},
  };
  files.forEach((file) => {
    typesVersion[">=4"][file.replace("/index", "")] = [`build/@types/${file}`];
  });
  return typesVersion;
};

module.exports = {
  updatePackageTypesVersions,
};
