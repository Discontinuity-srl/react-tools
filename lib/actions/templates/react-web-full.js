import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { Button } from "antd"

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

    return <div className={this.props.className}>TODO</div>
  }
}

// ----------------------------------------------------------------------------
// Router wrapper
// ----------------------------------------------------------------------------

const _COMPONENT_NAME_WithRouter = withRouter(_COMPONENT_NAME_)

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
  _COMPONENT_NAME_WithRouter
)

// ----------------------------------------------------------------------------
// Styled components wrapper
// ----------------------------------------------------------------------------

const Styled_COMPONENT_NAME_ = styled(_COMPONENT_NAME_WithRedux)`
  & {
  }
`
// ----------------------------------------------------------------------------

export default Styled_COMPONENT_NAME_
