import React from 'react';


const NoMatch = ({ location }) => (
  <div className="errorMessage">
    <h1 className="text-center">
      Hmmm, that page does not exist…
    </h1>

    <h4 className="text-center">The page you're looking for (<code>{location.pathname}</code>) is not found or it's removed</h4>

  </div>
);

export default NoMatch;
