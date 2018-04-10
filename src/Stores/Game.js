import { observable, action } from 'mobx';
import heroesDetails from './heroes.json';

class Game {
  @observable gameModes = [
    { id: 0, name: "No Game Mode"},
    { id: 1, name: "All Pick"},
    { id: 2, name: "Captain's Mode"},
    { id: 3, name: "Random Draft"},
    { id: 4, name: "Single Draft"},
    { id: 5, name: "All Random"},
    { id: 6, name: "Diretide"},
    { id: 7, name: "Reverse Captain's Mode"},
    { id: 8, Name: "Greeviling"},
    { id: 9, name: "Tutorial"},
    { id: 10, name: "Mid Only"},
    { id: 11, name: "Least Played"},
    { id: 12, name: "New Player Poole"},
    { id: 13, name: "Compendium Matchmaking"},
    { id: 14, name: "Custom"},
    { id: 15, name: "Captain's Draft"},
    { id: 16, name: "Balanced Draft"},
    { id: 17, name: "Ability Draft"},
    { id: 18, name: "All Random Deathmatch"},
    { id: 19, name: "Solo Mid 1v1"},
    { id: 22, name: "Ranked All Pick"}
  ];
  @observable heroesData = [
    {id: 0, name: "Not picked"},
  ];
  @observable heroesDetails = heroesDetails;

  @action
  setHeroesData(hero) {
    this.accountMatches = [];
    hero.forEach(x => {
      this.heroesData.push({
        "id": x.id,
        "name": x.localized_name,
        "attribute": x.primary_attr,
        "attack_type": x.attack_type,
        "roles[]": x.roles
      })
    });
  }
}

export default new Game();
