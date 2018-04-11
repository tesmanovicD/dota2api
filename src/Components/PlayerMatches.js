import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData, sortByAttribute, getUrlQuery } from '../util';
import { observer, inject } from 'mobx-react';
import PrintMatch from './PrintMatch';
import PagesPagination from './PagesPagination';
import { BarLoader } from 'react-spinners';
import { withRouter } from 'react-router-dom';


@withRouter
@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  state = {
    request: {
      status: "PENDING",
      message: ""
    },
    perPage: 20
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
        this.updateLocation();
      }
  }

  componentDidMount() {

    if(this.props.location) {
      let pageNumber = getUrlQuery(this.props.location.search, "page");
      if (!this.props.location.search) { pageNumber = 1; }

      this.setState({limit: pageNumber *  this.state.perPage, offset: (pageNumber * this.state.perPage) - this.state.perPage});
    }

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
        .then( () => {
          this.setState({arrayLength: this.props.account.accountMatches.length})
          this.setState({request: {status:"SUCCESS"}})
        })
    )
      .catch(err => this.setState({request:{status: "ERROR", message: "Can't get user data, please try again"}}))
  }

  updateLocation() {
    let pageNumber = getUrlQuery(this.props.location.search, "page");
    this.setState({limit: pageNumber *  this.state.perPage, offset: (pageNumber * this.state.perPage) - this.state.perPage});
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
            {this.state.arrayLength &&
              <PagesPagination arrayLength={this.state.arrayLength} setPage={this.handleSetPage} perPage={this.state.perPage} />
            }
          </div>
        )
      case 'ERROR':
        return (
          <h3 className="alert alert-danger">{this.state.request.message}</h3>
        )
    }
  }

  handleSetPage = (pageNumber) => {
    this.props.history.push(`?page=${pageNumber}`)
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
    return this.props.account.accountMatches.slice(this.state.offset, this.state.limit).map(match => {
      let heroImg = this.props.game.heroesDetails.find(h => h.id === match.heroId).url_small_portrait;
      return <PrintMatch match={match} heroImg={heroImg} key={match.matchId} sort={this.sortArray} />
    }
  )}

  render() {
      return (
      <div className="playermatches">
        {this.showComponentBasedOnReqStatus(this.state.request.status)}
      </div>
    )
  }
}
