import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../actions/error';

class Error extends Component {
  constructor(props) {
    super(props);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleDismissClick(event) {
    event.preventDefault();
    this.props.resetError();
  }

  render() {
    const { message } = this.props;

    if (!message.length) {
      return null;
    }

    return (
      <div className="row">
        <div className="twelve columns">
          An error occurred: "{message}"
          <a href="#" className="u-pull-right" onClick={this.handleDismissClick}>X</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.error.message };
}

export default connect(mapStateToProps, { resetError })(Error);
