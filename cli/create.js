// require("babel-core/register")

const create = require("../lib/actions/create")

// ----------------------------------------------------------------------------

const cliArguments = process.argv.slice(2)
const [name, dirname, isReactNativeFlag] = cliArguments
const isReactNative = isReactNativeFlag === "true"

create(name, dirname, isReactNative)
