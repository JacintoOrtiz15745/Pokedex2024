const weakness = [
  {
    normal: {
      weaknesses: ['Fighting'],
    },
    fire: {
      weaknesses: ['Water', 'Ground', 'Rock'],
    },
    water: {
      weaknesses: ['Grass', 'Electric'],
    },
    grass: {
      weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
    },
    electric: {
      weaknesses: ['Ground'],
    },
    ice: {
      weaknesses: ['Fire', 'Fighting', 'Rock', 'Steel'],
    },
    fighting: {
      weaknesses: ['Flying', 'Psychic', 'Fairy'],
    },
    poison: {
      weaknesses: ['Ground', 'Psychic'],
    },
    ground: {
      weaknesses: ['Water', 'Grass', 'Ice'],
    },
    flying: {
      weaknesses: ['Electric', 'Ice', 'Rock'],
    },
    psychic: {
      weaknesses: ['Bug', 'Ghost', 'Dark'],
    },
    bug: {
      weaknesses: ['Flying', 'Rock', 'Fire'],
    },
    rock: {
      weaknesses: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
    },
    ghost: {
      weaknesses: ['Ghost', 'Dark'],
    },
    dragon: {
      weaknesses: ['Ice', 'Dragon', 'Fairy'],
    },
    dark: {
      weaknesses: ['Fighting', 'Bug', 'Fairy'],
    },
    steel: {
      weaknesses: ['Fire', 'Fighting', 'Ground'],
    },
    fairy: {
      weaknesses: ['Poison', 'Steel'],
    },
  },
];

export const filterWeakness = (type: string) => {
  const foundType = weakness[0][type];
  return foundType ? foundType.weaknesses : [];
};
