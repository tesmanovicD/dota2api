import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData } from '../util';
import { observer, inject } from 'mobx-react';
import PrintMatch from './PrintMatch';
import PagesPagination from './PagesPagination';
import { BarLoader } from 'react-spinners';

@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  state = {
      requestStatus: "PENDING",
  }

  componentWillMount() {
    this.props.account.currentPage = 1;
    this.setPageNavigation();

    getHeroesData()
    .then(result => this.props.game.setHeroesData(result))
    .then(heroesData =>
      getPlayerMatches(this.props.accountId || this.props.match.params.id)
        .then(result => {
          this.props.account.setAccountMatches(result,this.props.game,this.props.limit)
        })
        .then(this.getPageNumbers)
        .then(this.setState({requestStatus: "SUCCESS"}))
    )
      .catch(err => {console.log(err);this.setState({requestStatus: "ERROR"})})
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader />
      case 'SUCCESS':
        return (
          <div>
          <table className="table table-bordered table-striped">
            {this.renderPlayerMatches()}
          </table>
          {this.props.account.pageNumbers.length > 1 &&
          <ul className="pagination">
            {this.renderNavigation()}
          </ul>
          }
          </div>
        )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">Can't get user data, try again</h2>
        )
    }
  }

  handlePageNumberClick = (e) => {
    this.props.account.currentPage = e.target.id;
    this.setPageNavigation();
  }

  getPageNumbers = () => {
    this.props.account.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.account.accountMatches.length / 20); i++) {
      this.props.account.pageNumbers.push(i);
    }
  }

  sortArray = (type, order) => {
    let matchesCopy = this.props.account.accountMatches.slice();

    switch (type) {
      case "match":
        this.sortMatches(matchesCopy, order);
        break;

      case "result":
        this.sortResults(matchesCopy, order);
        break;

      default:
        alert("error, type is not found");
        break;
    }
  }

  sortMatches = (matchesCopy,orderBy) => {
    if(orderBy === "descending") {
      matchesCopy.sort((a,b) => b["duration"] - a["duration"])
      this.props.account.sortArray(matchesCopy)
    } else {
      matchesCopy.sort((a,b) => a["duration"] - b["duration"])
      this.props.account.sortArray(matchesCopy)
    }
  }

  sortResults = (matchesCopy, orderBy) => {
    if(orderBy === "descending") {
      matchesCopy.sort((a,b) => b["matchStatus"].length - a["matchStatus"].length)
      this.props.account.sortArray(matchesCopy)
    } else {
      matchesCopy.sort((a,b) => a["matchStatus"].length - b["matchStatus"].length)
      this.props.account.sortArray(matchesCopy)
    }
  }

  setPageNavigation() {
    this.props.account.indexOfLastTodo = this.props.account.currentPage * 20;
    this.props.account.indexOfFirstTodo = this.props.account.indexOfLastTodo - 20;
  }

  renderPlayerMatches = () => {
    return this.props.account.accountMatches.slice(this.props.account.indexOfFirstTodo, this.props.account.indexOfLastTodo).map(match =>
      <PrintMatch match={match} key={match.matchId} sort={this.sortArray} />
  )}

  renderNavigation = () => {
    return this.props.account.pageNumbers.map(pageNumber =>
      <PagesPagination pageNumberClick={this.handlePageNumberClick} pageNumber={pageNumber} currentPage={this.props.account.currentPage} key={pageNumber}/>
    )
  }

  render() {
      return (
      <div className="playermatches">
        {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
      </div>
    )
  }
}
