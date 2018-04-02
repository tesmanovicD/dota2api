import React from 'react';

const PagesPagination = (props) => (
  <li onClick={props.pageNumberClick}><a id={props.pageNumber}>{props.pageNumber}</a></li>
  )

export default PagesPagination;
