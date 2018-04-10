import React from 'react';

const PrintRecentHeroes = (props) => (
    <tr>
      <td>
        <img src={props.heroImg} className="img-responsive heroImage" alt={props.hero.hero_name + " image"}/>
        {props.hero.hero_name}
      </td>
      <td>{props.hero.games}</td>
      <td>{props.winRatio}%</td>
      <td>{props.lastPlayed}</td>
    </tr>

)

export default PrintRecentHeroes;
