import React from 'react';
import { secondsToMinutesAndSeconds } from '../util';

const PrintMatch = (props) => (

  <tr className={`${props.match.matchStatus}-class`}>
    <td>
      <img src={props.heroImg} className="img-responsive heroImage" alt={`${props.match.heroName}`}/>
      {props.match.heroName}</td>
    <td >{props.match.matchStatus} Match</td>
    <td>{props.match.gameMode}</td>
    <td>{secondsToMinutesAndSeconds(props.match.duration)} min</td>
    <td>
      {props.match.kills}/{props.match.deaths}/{props.match.assists}
    </td>
  </tr>

);

export default PrintMatch;
