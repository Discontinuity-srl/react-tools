const path = require("path")
const fs = require("fs-plus")

const findRoot = require("find-root")

// ----------------------------------------------------------------------------

function isPathInReactNativeProject(givenPath) {
  const root = findRoot(givenPath)
  if (root == "") {
    return false
  }

  const packagePath = path.join(root, "package.json")
  const packageContents = fs.readFileSync(packagePath, "utf8")
  if (packageContents) {
    const packageJSON = JSON.parse(packageContents)
    const dependencyNames = Object.keys(packageJSON.dependencies || {})
    const found = dependencyNames.find(x => x === "react-native") != null
    return found
  }

  return false
}

function findSourceDir(givenPath) {
  const root = findRoot(givenPath)
  if (root == "") {
    return givenPath
  }

  const srcPath = path.join(root, "src")
  if (fs.isDirectorySync(srcPath)) {
    return srcPath
  } else {
    return root
  }
}

// ----------------------------------------------------------------------------

module.exports = { isPathInReactNativeProject, findSourceDir }
