import React, { Component } from 'react';

export default class PlayerInfo extends Component {
  render() {
    return (
      <div className="playerinfo">
        { this.props.children }
      </div>
    )
  }
}
