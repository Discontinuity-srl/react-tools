require("babel-core/register")

const dscHelpers = require("../lib/dscHelpers")

// ----------------------------------------------------------------------------

const cliArguments = process.argv.slice(2)
const [dirname] = cliArguments
const findSourceDir = dscHelpers.findSourceDir(dirname)
const isPathInReactNativeProject = dscHelpers.isPathInReactNativeProject(
  dirname
)

// eslint-disable-next-line
console.dir({ findSourceDir, isPathInReactNativeProject })
