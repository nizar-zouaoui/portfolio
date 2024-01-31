const { getPackageInfo } = require("./getPackageInfo")

const pkgName = process.argv[2]

const pkgInfo = getPackageInfo(pkgName)

console.log(pkgInfo.location)