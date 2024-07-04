import { colors } from '../Colors';
import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  HeightMedium,
  HeightShort,
  HeightTall,
  Ice,
  Normal,
  Pattern,
  PatternSmall,
  PatternSmallGray,
  Poison,
  Psychic,
  Rock,
  Steel,
  Water,
  WeightHeavy,
  WeightLight,
  WeightNormal,
} from '../../assets/svgs';

export const TypeColors = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bug':
      return colors.type.bug;
    case 'dark':
      return colors.type.dark;
    case 'dragon':
      return colors.type.dragon;
    case 'electric':
      return colors.type.electric;
    case 'fairy':
      return colors.type.fairy;
    case 'fighting':
      return colors.type.fighting;
    case 'fire':
      return colors.type.fire;
    case 'flying':
      return colors.type.flying;
    case 'ghost':
      return colors.type.ghost;
    case 'grass':
      return colors.type.grass;
    case 'ground':
      return colors.type.ground;
    case 'ice':
      return colors.type.ice;
    case 'normal':
      return colors.type.normal;
    case 'poison':
      return colors.type.poison;
    case 'psychic':
      return colors.type.psychic;
    case 'rock':
      return colors.type.rock;
    case 'steel':
      return colors.type.steel;
    case 'water':
      return colors.type.water;
    default:
      return '';
  }
};

export const BackgroundTypeColors = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bug':
      return colors.backgroundType.bug;
    case 'dark':
      return colors.backgroundType.dark;
    case 'dragon':
      return colors.backgroundType.dragon;
    case 'electric':
      return colors.backgroundType.electric;
    case 'fairy':
      return colors.backgroundType.fairy;
    case 'fighting':
      return colors.backgroundType.fighting;
    case 'fire':
      return colors.backgroundType.fire;
    case 'flying':
      return colors.backgroundType.flying;
    case 'ghost':
      return colors.backgroundType.ghost;
    case 'grass':
      return colors.backgroundType.grass;
    case 'ground':
      return colors.backgroundType.ground;
    case 'ice':
      return colors.backgroundType.ice;
    case 'normal':
      return colors.backgroundType.normal;
    case 'poison':
      return colors.backgroundType.poison;
    case 'psychic':
      return colors.backgroundType.psychic;
    case 'rock':
      return colors.backgroundType.rock;
    case 'steel':
      return colors.backgroundType.steel;
    case 'water':
      return colors.backgroundType.water;
    default:
      return '';
  }
};

export const IconType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bug':
      return Bug;
    case 'dark':
      return Dark;
    case 'dragon':
      return Dragon;
    case 'electric':
      return Electric;
    case 'fairy':
      return Fairy;
    case 'fighting':
      return Fighting;
    case 'fire':
      return Fire;
    case 'flying':
      return Flying;
    case 'ghost':
      return Ghost;
    case 'ground':
      return Ground;
    case 'ice':
      return Ice;
    case 'normal':
      return Normal;
    case 'poison':
      return Poison;
    case 'psychic':
      return Psychic;
    case 'rock':
      return Rock;
    case 'steel':
      return Steel;
    case 'water':
      return Water;
    default:
      return Grass;
  }
};
