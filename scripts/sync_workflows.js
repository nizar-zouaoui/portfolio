const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const PUBLISH_TEMPLATE_PATH = path.join(
  __dirname,
  "publish_to_npm_template.yml"
);
const PUBLISH_WORKFLOW_PATH = path.join(
  __dirname,
  "..",
  ".github/workflows/publish_to_npm.yml"
);
const PACKAGES_PLACEHOLDER = "# PACKAGES_PLACEHOLDER";
const workspacesInfoRaw = execSync("yarn workspaces info --json", {
  stdio: "pipe",
}).toString();

const workspacesInfoStringified = workspacesInfoRaw.substring(
  workspacesInfoRaw.indexOf("{"),
  workspacesInfoRaw.lastIndexOf("}") + 1
);
const workspacesInfo = JSON.parse(workspacesInfoStringified);
const packages = [];
for (key in workspacesInfo) {
  if (workspacesInfo[key].location.includes("package")) {
    packages.push(key);
  }
}
let yamlPackages = `- "N/A"`;
packages.forEach(
  (package) =>
    (yamlPackages += `
          - "${package}"`)
);

const yamlTemplate = fs.readFileSync(PUBLISH_TEMPLATE_PATH, "utf-8");
console.log(yamlTemplate);
fs.writeFileSync(
  PUBLISH_WORKFLOW_PATH,
  yamlTemplate.replace(PACKAGES_PLACEHOLDER, yamlPackages)
);
