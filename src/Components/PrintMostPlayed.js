import React from 'react';

const PrintRecentHeroes = (props) => (
    <tr>
      <td>{props.hero.hero_name}</td>
      <td>{props.hero.games}</td>
      <td>{props.winRatio}%</td>
      <td>{props.lastPlayed}</td>
    </tr>

)

export default PrintRecentHeroes;
