import React from 'react';

const PrintMatch = (props) => (
  <tbody key={props.match.matchId}>
  <tr>
    <th>Hero</th>
    <th>Result</th>
    <th>Type</th>
    <th>Duration</th>
    <th>K/D/A</th>
  </tr>
  <tr>
    <td>{props.heroesName}</td>
    <td>{props.match.matchStatus}</td>
    <td>{props.gameModes}</td>
    <td>{(props.match.duration)} min</td>
    <td>
      {props.match.kills}/{props.match.deaths}/{props.match.assists}
    </td>
  </tr>
  </tbody>
);

export default PrintMatch;
