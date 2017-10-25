"use babel"

const fs = require("fs")

var path = require("path")
const promisify = require("util-promisify")

const glob = promisify(require("glob"))
var mv = promisify(require("mv"))

// ----------------------------------------------------------------------------

export default function run(directory, fromName, toName) {
  process.chdir(directory)

  glob("**/*.js", {})
    .then(files => {
      const filesWithFromName = files.filter(filePath =>
        hasFileString(filePath, fromName)
      )
      // process.stdout.write(`Replacing in ${filesWithFromName.length} files\n`)
      return filesWithFromName.forEach(filePath =>
        replaceRegexInFile(filePath, fromName, toName)
      )
    })
    .then(() => glob("**/*.*", {}))
    .then(files => {
      const filesToRename = files
        .sort((a, b) => b.length - a.length)
        .map(filePath => generateRenamePath(filePath, fromName, toName))
        .filter(x => x)
      // process.stdout.write(`\n\nRenaming in ${filesToRename.length} files\n`)

      return Promise.all(
        filesToRename.map(paths => renameFiles(directory, paths))
      ).then(() => filesToRename)
    })
    .then(filesToRename => {
      // process.stdout.write(`\n\nDeleting empty dirs\n`)
      filesToRename
        .map(x => path.dirname(x.filePath))
        .forEach(cleanEmptyFoldersRecursively)
      return filesToRename
    })
    .then(() => {
      // process.stdout.write(`\n\nDONE`)
    })
    .catch(err => {
      console.error(err)
      // process.stderr.write(`\n\nERROR`)
      // process.stderr.write(err)
      // process.exit(1)
    })
}

// ----------------------------------------------------------------------------

function hasFileString(filePath, string) {
  const fileString = fs.readFileSync(filePath, "utf8")
  return fileString.indexOf(string) !== -1
}

function replaceRegexInFile(filePath, fromName, toName) {
  // process.stdout.write(`- REPLACE ${filePath}\n`)
  let result = fs.readFileSync(filePath, "utf8")

  const replacePairs = [
    { from: fromName, to: toName },
    { from: `${fromName}Nav`, to: `${toName}Nav` },
  ]
  for (const { from, to } of replacePairs) {
    result = replace(result, `(<)${from}([ \\n>])`, `$1${to}$2`)
    result = replace(result, `([ ,."/\\n])${from}([ ,."/\\n:])`, `$1${to}$2`)
  }

  fs.writeFileSync(filePath, result, "utf8")
}

function generateRenamePath(filePath, fromName, toName) {
  let result = filePath

  result = replace(result, `(/)${fromName}(/)`, `$1${toName}$2`)
  result = replace(result, `(/)${fromName}Nav(/)`, `$1${toName}Nav$2`)
  result = replace(result, `(/)${fromName}(.js)`, `$1${toName}$2`)
  result = replace(result, `(/)${fromName}Nav(.js)`, `$1${toName}Nav$2`)

  if (result !== filePath) {
    return { filePath, newPath: result }
  }
}

// ----------------------------------------------------------------------------

function replace(string, from, to) {
  const regEx = new RegExp(from, "g")
  return string.replace(regEx, to)
}

function renameFiles(directory, { filePath, newPath }) {
  return mv(directory + "/" + filePath, directory + "/" + newPath, {
    mkdirp: true,
  })
    .then(() => {
      // process.stdout.write(`- MOVE ${filePath} -> ${newPath}\n`)
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

// ----------------------------------------------------------------------------

function cleanEmptyFoldersRecursively(folder) {
  if (!fs.existsSync(folder)) {
    return
  }

  if (!fs.statSync(folder).isDirectory()) {
    return
  }

  var files = fs.readdirSync(folder)
  if (files.length > 0) {
    files.forEach(function(file) {
      var fullPath = path.join(folder, file)
      cleanEmptyFoldersRecursively(fullPath)
    })

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folder)
  }

  if (files.length == 0) {
    fs.rmdirSync(folder)
    return
  }
}
