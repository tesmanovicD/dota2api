import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData, sortByAttribute, setPageNavigation, getPageNumbers } from '../util';
import { observer, inject } from 'mobx-react';
import PrintMatch from './PrintMatch';
import PagesPagination from './PagesPagination';
import { BarLoader } from 'react-spinners';

@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  state = {
    request: {
      status: "PENDING",
      message: ""
    }
  }

  componentDidMount() {
    this.props.account.currentPage = 1;
    setPageNavigation.bind(this)();

    getHeroesData()
    .then(result => this.props.game.setHeroesData(result))
    .then(getPlayerMatches(this.props.accountId || this.props.match.params.id)
        .then(result => {
          if(result.length <= 0) {
            throw new Error("")
          }
          this.props.account.setAccountMatches(result,this.props.game,this.props.limit)
        })
        .catch(err => this.setState({request:{status: "ERROR", message: "Player has no recent matches!"}}))
        .then(getPageNumbers.bind(this))
        .then(this.setState({request: {status:"SUCCESS"}}))
    )
      .catch(err => this.setState({request:{status: "ERROR", message: "Can't get user data, please try again"}}))
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader />
      case 'SUCCESS':
        return (
          <div>
          <table className="table table-bordered">
            <tbody>
              <tr className="table-heading">
                <th>Hero</th>
                <th>
                  Result
                  <a onClick={ () => this.sortArray("result", "ascending") }><span className="glyphicon glyphicon-chevron-up" title="Sort ascending"></span></a>
                  <a onClick={ () => this.sortArray("result", "descending") }><span className="glyphicon glyphicon-chevron-down" title="Sort descending"></span></a>
                </th>
                <th>Type</th>
                <th>
                  Duration
                  <a onClick={ () => this.sortArray("match","ascending") }><span className="glyphicon glyphicon-chevron-up" title="Sort ascending"></span></a>
                  <a onClick={ () => this.sortArray("match","descending") }><span className="glyphicon glyphicon-chevron-down" title="Sort descending"></span></a>
                </th>
                <th>K/D/A</th>
              </tr>
            {this.renderPlayerMatches()}
          </tbody>
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
          <h3 className="alert alert-danger">{this.state.request.message}</h3>
        )
    }
  }

  handlePageNumberClick = (e) => {
    this.props.account.currentPage = e.target.id;
    setPageNavigation.bind(this)();
  }

  sortArray = (type, order) => {
    let matchesCopy = this.props.account.accountMatches.slice();

    switch (type) {
      case "match":
        let sortedMatch = sortByAttribute(matchesCopy, "duration", order)
        this.props.account.sortArray(sortedMatch)
        break;

      case "result":
        sortedMatch = sortByAttribute(matchesCopy, "matchWon", order);
        this.props.account.sortArray(sortedMatch);
        break;

      default:
        alert("error, type is not found");
        break;
    }
  }

  renderPlayerMatches = () => {
    return this.props.account.accountMatches.slice(this.props.account.indexOfFirstTodo, this.props.account.indexOfLastTodo).map(match =>
      {
      let heroImg = this.props.game.heroesDetails.find(h => h.id === match.heroId).url_small_portrait;
      return <PrintMatch match={match} heroImg={heroImg} key={match.matchId} sort={this.sortArray} />
      }
  )}

  renderNavigation = () => {
    return this.props.account.pageNumbers.map(pageNumber =>
      <PagesPagination pageNumberClick={this.handlePageNumberClick} pageNumber={pageNumber} currentPage={this.props.account.currentPage} key={pageNumber}/>
    )
  }

  render() {
      return (
      <div className="playermatches">
        {this.showComponentBasedOnReqStatus(this.state.request.status)}
      </div>
    )
  }
}
