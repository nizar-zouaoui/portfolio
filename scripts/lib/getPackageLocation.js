const { getPackageInfo } = require("./getPackageInfo")

const pkgName = process.argv[2]

const pkgInfo = getPackageInfo(pkgName)

process.stdout.write(pkgInfo.location)