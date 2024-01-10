const fs = require("fs-extra");
const path = require("path");
const relativizeImports = (pkgName, rootDir) => {
  const files = getAllFiles(rootDir).filter(
    (file) => path.extname(file) === ".ts"
  );
  files.forEach((file) => {
    const fileDepth = getFileDepth(file, rootDir);
    console.log({ rootDir, file, fileDepth });
    const fileData = fs.readFileSync(file, "utf8");
    const updatedFile = updateFileImports(fileData, pkgName, fileDepth);
    fileData !== updatedFile && console.log("updated", file);
    fs.writeFileSync(file, updateFileImports(fileData, pkgName, fileDepth));
  });
};

const getAllFiles = (directoryPath, filesArray = []) => {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, filesArray);
    } else {
      filesArray.push(filePath);
    }
  });

  return filesArray;
};

const getFileDepth = (filePath, rootDirectory) => {
  const relativePath = path.relative(rootDirectory, filePath);
  const splitPath = relativePath.split(path.sep);
  const depthLevel = splitPath.length - 1;
  let preFix = "./";
  if (depthLevel > 0) {
    preFix = "";
    for (let i = 0; i < depthLevel; i++) {
      preFix += "../";
    }
  }

  return preFix;
};

const updateFileImports = (fileData, pkgName, depth) => {
  const regexPattern = new RegExp(
    `^import\\s+.+?\\s+from\\s+"(${pkgName}|${pkgName}/.+?)";*$`,
    "gm"
  );
  const relativePkg = `${depth}${pkgName.replace("@nizar-repo/", "")}`;
  return fileData.replace(regexPattern, (match) => {
    return match.replace(pkgName, relativePkg);
  });
};
module.exports = {
  relativizeImports,
};
