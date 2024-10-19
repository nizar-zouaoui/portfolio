const fs = require("fs");
const path = require("path");

const workspaces = ["apps/", "apps/APIs/", "dev-env/"];

const copyEnv = (dir) => {
  const envExamplePath = path.join(dir, ".env.example");
  const envPath = path.join(dir, ".env");
  if (fs.existsSync(envPath)) return;
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
  }
};

workspaces.forEach((workspace) => {
  const workspacePath = path.join(__dirname, "..", workspace);
  const dirs = fs.readdirSync(workspacePath);
  dirs.forEach((dir) => {
    const dirPath = path.join(workspace, dir);
    if (fs.lstatSync(dirPath).isDirectory()) {
      copyEnv(dirPath);
    }
  });
});
