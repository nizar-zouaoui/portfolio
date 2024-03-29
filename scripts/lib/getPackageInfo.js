const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
function getPackageInfo(packageName) {
  const workspacesInfoRaw = execSync("yarn workspaces info --json", {
    stdio: "pipe",
  }).toString();
  const workspacesInfoStringified = workspacesInfoRaw.substring(
    workspacesInfoRaw.indexOf("{"),
    workspacesInfoRaw.lastIndexOf("}") + 1
  );
  const workspacesInfo = JSON.parse(workspacesInfoStringified);

  if (!workspacesInfo[packageName]) {
    throw new Error(`Could not find ${packageName} in workspaces`);
  }

  workspacesInfo[packageName].hasSrc = fs.existsSync(
    path.join(__dirname,"../..", workspacesInfo[packageName].location, "src")
  );
  return workspacesInfo[packageName];
}

module.exports = {
  getPackageInfo,
};
