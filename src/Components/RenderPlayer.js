import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PlayerInfo from './PlayerInfo';
import { getPlayerById } from '../util.js';
import { BarLoader } from 'react-spinners';
import HeaderNavigation from './HeaderNavigation';

@inject("account","game")
@observer
export default class RenderPlayer extends Component {
  state = {
    requestStatus: "PENDING"
  }

  componentWillMount() {
    getPlayerById.bind(this)(this.props.match.params.id)
    .then(this.setState({requestStatus: "SUCCESS"}))
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader/>
      case 'SUCCESS':
        return (
            this.renderComponents()
          )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">Cant get the user data, try again</h2>
        )
    }
  }

  renderComponents = () => (
    <div>
      <PlayerInfo />
      <HeaderNavigation />
    </div>
  )

  render() {
    return (
        <div className="PlayerOverview">
          {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
        </div>
      )
  }
}
