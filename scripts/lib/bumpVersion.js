const getNewVersion = (versionUpdate, currVersion) => {
  const [major, minor, patch] = currVersion.split(".");
  if (versionUpdate === "major") return `${Number(major) + 1}.0.0`;
  if (versionUpdate === "minor") return `${major}.${Number(minor) + 1}.0`;
  return `${major}.${minor}.${Number(patch) + 1}`;
};

module.exports = {
  getNewVersion,
};
