"use babel"

const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const stripIndent = require("strip-indent")
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

function renderReactWebTemplate(name) {
  const template = `
  import React from "react"
  import PropTypes from "prop-types"
  import { bindActionCreators } from "redux"
  import { connect } from "react-redux"
  import { withRouter } from "react-router-dom"
  import styled from "styled-components"
  import { Button } from "antd"

  import { action } from "../_shared/redux-actions"

  // ----------------------------------------------------------------------------

  export class ${name} extends React.Component {

    static propTypes = {
      className: PropTypes.string.isRequired,
    }

    // -------------------------------------

    state = {

    }

    // -------------------------------------

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
    }

    // -------------------------------------

    render() {
      const { user } = this.props
      const { value } = this.state

      return (
        <div className={this.props.className}>
          TODO
        </div>
      )
    }
  }

  // ----------------------------------------------------------------------------
  // Router wrapper
  // ----------------------------------------------------------------------------

  const ${name}WithRouter = withRouter(${name})

  // ----------------------------------------------------------------------------
  // Redux wrapper
  // ----------------------------------------------------------------------------

  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user.user,
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ action }, dispatch)
  }

  const ${name}WithRedux = connect(mapStateToProps, mapDispatchToProps)(
    ${name}WithRouter
  )

  // ----------------------------------------------------------------------------
  // Styled components wrapper
  // ----------------------------------------------------------------------------

  const Styled${name} = styled(${name}WithRedux)\`
    & {
    }
  \`
  export default Styled${name}
  `

  return stripIndent(template).replace(/^\n/, "")
}

// ----------------------------------------------------------------------------

function renderReactNativeTemplate(name) {
  const template = `
  import React from "react"
  import PropTypes from "prop-types"
  import {
    View,
    Text,
    StyleSheet
  } from 'react-native'
  import { connect } from "react-redux"
  import { bindActionCreators } from "redux"

  import { action } from "../_shared/redux-actions"

  // ----------------------------------------------------------------------------

  export class ${name} extends React.Component {

    static propTypes = {
      className: PropTypes.string.isRequired,
    }

    // -------------------------------------

    state = {

    }

    // -------------------------------------

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
    }

    // -------------------------------------

    render() {
      const { user } = this.props
      const { value } = this.state

      return (
        <View style={styles.root}>
          <Text>TODO</Text>
        </View>
      )
    }
  }

  // ----------------------------------------------------------------------------
  // Styles
  // ----------------------------------------------------------------------------

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'white'
    }
  })

  // ----------------------------------------------------------------------------
  // Redux wrapper
  // ----------------------------------------------------------------------------

  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user.user,
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ action }, dispatch)
  }

  const ${name}WithRedux = connect(mapStateToProps, mapDispatchToProps)(
    ${name}
  )

  export default ${name}WithRedux
  `

  return stripIndent(template).replace(/^\n/, "")
}
