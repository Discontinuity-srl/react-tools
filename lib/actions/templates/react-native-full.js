import React from "react"
import PropTypes from "prop-types"
import { View, Text, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { action } from "../_shared/redux-actions"

// ----------------------------------------------------------------------------

export class _COMPONENT_NAME_ extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
  }

  // -------------------------------------

  state = {}

  // -------------------------------------

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

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
    backgroundColor: "white",
  },
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

const _COMPONENT_NAME_WithRedux = connect(mapStateToProps, mapDispatchToProps)(
  _COMPONENT_NAME_
)

// ----------------------------------------------------------------------------

export default _COMPONENT_NAME_WithRedux
