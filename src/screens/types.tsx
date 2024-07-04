import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ItemProps } from '../components';

export type DetailsProps = {
  number: string;
  pokemonName: string;
  pokemonType: string;
  pokemonImage: {
    pokemon_v2_pokemonsprites: {
      sprites: string;
    }[];
  };
  data?: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
};

export type AboutProps = {
  backgroundType: string;
  pokemonType: string;
};

export type StatsProps = {
  backgroundType: string;
  pokemonType: string;
};

export type EvolutionProps = {
  backgroundType: string;
  pokemonType: string;
};

export type RootStackParamList = {
  Home: undefined;
  Details: DetailsProps;
  About: AboutProps;
  Stats: StatsProps;
  Evolution: EvolutionProps;
};

export type HomeScreenNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;
