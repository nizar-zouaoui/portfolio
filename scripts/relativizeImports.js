const fs = require("fs-extra");
const relativizeImports = (pkgName, rootDir) => {
  const files = getAllFiles(rootDir).filter((file) => file.includes("pkgName"));

  files.forEach((file) => {
    const fileDepth = getFileDepth(file, rootDir);
    const fileData = fs.readFileSync(file, "utf8");
    fs.writeFileSync(
      file,
      // TODO fix regex for replace
      fileData.replace(
        `import * from "${pkgName}*/***"`,
        `import * from "${fileDepth}${pkgName}*/***"`
      )
    );
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

  return depthLevel;
};
