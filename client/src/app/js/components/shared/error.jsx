import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../actions/error';

class Error extends Component {

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
          <a href="#" className="u-pull-right" onClick={this.handleDismissClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({error}) => ({ message: error.message })

export default connect(mapStateToProps, { resetError })(Error);
