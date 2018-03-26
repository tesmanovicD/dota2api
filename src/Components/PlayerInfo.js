import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("account")
@observer
export default class PlayerInfo extends Component {
  render() {

    return (
      <div className="playerinfo">
        <h2>PlayerInfo</h2>
      </div>
    )
  }
}
