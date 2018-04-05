import React from 'react';

const SearchedPlayerList = (props) => (

    <div className="col-md-4 row playerBox">
      <div className="col-md-4">
        <img src={props.account.avatar} className="img-responsive" alt={"user "+props.account.accountId+" avatar"} />
      </div>

      <div className="col-md-7">
        <h3>{props.account.name}</h3>
        <p>Last Match: {props.account.lastMatch}</p>
      </div>

    </div>


);

export default SearchedPlayerList;
