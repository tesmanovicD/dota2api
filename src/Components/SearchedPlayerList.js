import React from 'react';

const SearchedPlayerList = (props) => (

    <div className="col-md-4 playerBox">
      <div className="col-md-4">
        <img src={props.account.avatar} className="img-responsive" alt={"user "+props.account.accountId+" avatar"} />
      </div>

      <div className="col-md-7 rowFix">
        <h3 title={props.account.name}>{props.accountName}</h3>
        <p>Last Match: {props.account.lastMatch}</p>
      </div>

    </div>


);

export default SearchedPlayerList;
