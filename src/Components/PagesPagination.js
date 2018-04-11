import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("account")
@observer
export default class PagesPagination extends Component {

  state = {
    pageNumbers: [],
    currentPage: 1,
  }

  componentWillMount() {
    this.getPageNumbers();
  }

  getPageNumbers() {
    for (let i = 1; i <= Math.ceil(this.props.arrayLength / this.props.perPage); i++) {
      this.state.pageNumbers.push(i);
    }
  }

  pageNumberClick = (e) => {
    this.setState({currentPage: e.target.id})
    this.props.setPage(e.target.id);
  }


  render() {
    const paginationList = this.state.pageNumbers.map(pageNumber =>
      <li id={pageNumber} onClick={this.pageNumberClick} key={pageNumber}><a id={pageNumber}>{pageNumber}</a></li>
    )

    return (
      <ul className="pagination">
        {this.state.pageNumbers.length > 1 &&
          paginationList
        }
      </ul>
    )
  }
}
