"use babel"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const toPascalCase = require("to-pascal-case")

// ----------------------------------------------------------------------------

module.exports = function createAction(givenName, dirname, isReactNative) {
  const name = toPascalCase(givenName)
  let contents
  if (isReactNative) {
    contents = renderReactNativeTemplate(name)
  } else {
    contents = renderReactWebTemplate(name)
  }

  const folderPath = path.join(dirname, name)
  mkdirp.sync(folderPath)
  const indexFilePath = path.join(folderPath, "index.js")
  fs.writeFileSync(indexFilePath, contents, "utf8")
  return { name, indexFilePath }
}

// ----------------------------------------------------------------------------

function renderReactWebTemplate(componentName) {
  return renderTemplate("react-web-full.js", componentName)
}

function renderReactNativeTemplate(componentName) {
  return renderTemplate("react-native-full.js", componentName)
}

// ----------------------------------------------------------------------------

function renderTemplate(fileName, componentName) {
  const templatePath = path.join(__dirname, "templates", fileName)
  const template = fs.readFileSync(templatePath, "utf8")
  return template.replace(/_COMPONENT_NAME_/g, componentName)
}
