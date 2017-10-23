// require("babel-core/register")

const createAction = require("../lib/createAction")

// ----------------------------------------------------------------------------

const cliArguments = process.argv.slice(2)
const [name, dirname, isReactNativeFlag] = cliArguments
const isReactNative = isReactNativeFlag === "true"

createAction(name, dirname, isReactNative)
