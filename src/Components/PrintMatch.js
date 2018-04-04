import React from 'react';
import { secondsToMinutesAndSeconds } from '../util';

const PrintMatch = (props) => (
  <tbody>
  <tr>
    <th>Hero</th>
    <th>
      Result
      <a onClick={ () => props.sort("result", "ascending") }><span className="glyphicon glyphicon-chevron-up"></span></a>
      <a onClick={ () => props.sort("result", "descending") }><span className="glyphicon glyphicon-chevron-down"></span></a>
    </th>
    <th>Type</th>
    <th>
      Duration
      <a onClick={ () => props.sort("match","ascending") }><span className="glyphicon glyphicon-chevron-up"></span></a>
      <a onClick={ () => props.sort("match","descending") }><span className="glyphicon glyphicon-chevron-down"></span></a>
    </th>
    <th>K/D/A</th>
  </tr>
  <tr>
    <td>{props.match.heroName}</td>
    <td className={`${props.match.matchStatus}-class`}>{props.match.matchStatus} Match</td>
    <td>{props.match.gameMode}</td>
    <td>{secondsToMinutesAndSeconds(props.match.duration)} min</td>
    <td>
      {props.match.kills}/{props.match.deaths}/{props.match.assists}
    </td>
  </tr>
  </tbody>
);

export default PrintMatch;
