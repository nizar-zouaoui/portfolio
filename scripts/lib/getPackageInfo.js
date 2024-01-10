const { execSync } = require("child_process");
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

  return workspacesInfo[packageName];
}

module.exports = {
  getPackageInfo,
};
