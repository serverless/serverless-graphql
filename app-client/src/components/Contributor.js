import React, { Component } from 'react';

class Contributor extends Component {
    render() {
        return (
            <div>
                <div>{this.props.link.name}</div>
            </div>
        );
    }
}

export default Contributor