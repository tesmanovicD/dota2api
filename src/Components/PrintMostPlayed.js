import React from 'react';

const PrintRecentHeroes = (props) => (
  <tbody>
  <tr>
  </tr>
    <tr>
      <th>Hero</th>
      <th>Matches</th>
      <th>Win ratio</th>
      <th>Last Played</th>
    </tr>
    <tr>
      <td>{props.hero.hero_name}</td>
      <td>{props.hero.games}</td>
      <td>{props.winRatio}%</td>
      <td>{props.lastPlayed}</td>
    </tr>
  </tbody>

)

export default PrintRecentHeroes;
