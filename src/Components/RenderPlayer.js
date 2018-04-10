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
    request: {
      status: "PENDING",
      message: ""
    }
  }

  componentDidMount() {
    getPlayerById.bind(this)(this.props.match.params.id)
    .then(() => {
      if(!this.props.account.accountInfo.set) {
        this.setState({request:{status: "ERROR", message: "Player has no heroes played!"}})
      } else {
        this.setState({request: {status: "SUCCESS"}})
      }
    })
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
          <h2 className="alert alert-danger">{this.state.request.message}</h2>
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
          {this.showComponentBasedOnReqStatus(this.state.request.status)}
        </div>
      )
  }
}
