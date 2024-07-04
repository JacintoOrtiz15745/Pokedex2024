import React, { type ReactElement, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../utils/Colors';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { type RootStackParamList } from './types';
import { PokemonContext } from '../context/Context';
import { gql, useQuery } from '@apollo/client';
import { Constants } from '../utils/Constants';
import { TypeColors } from '../utils/functions/TypeColors';
import { Text } from '../components';
import * as Progress from 'react-native-progress';

type AboutScreenRouteProps = RouteProp<RootStackParamList, 'Stats'>;

export const Stats = (): ReactElement => {
  const route = useRoute<AboutScreenRouteProps>();
  const { backgroundType, pokemonType } = route.params;
  const colorType = TypeColors(pokemonType);

  const QUERY = gql`
    query ($id: Int!) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        pokemon_v2_pokemonstats {
          base_stat
          effort
        }
      }
    }
  `;

  const contextData = useContext(PokemonContext) as any;
  const { data } = useQuery(QUERY, { variables: { id: contextData.id } });
  const stats: any = {
    hp: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[0].base_stat,
    attack: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[1].base_stat,
    defense: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[2].base_stat,
    spAtk: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[3].base_stat,
    spDef: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[4].base_stat,
    speed: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats[5].base_stat,
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: backgroundType }]}>
      <View style={styles.secondContainer}>
        <Text
          preset="labelBold"
          style={[styles.labelBold, { color: colorType }]}>
          {Constants.baseStats}
        </Text>

        {Object.keys(stats).map((statNumber: any, index: number) => {
          return (
            <View style={styles.textContainer} key={index}>
              <Text preset="littleText" style={styles.littleText}>
                {Constants[statNumber]}
              </Text>
              <Text preset="description" style={styles.statValue}>
                {stats[statNumber]}
              </Text>
              <Progress.Bar
                progress={1}
                width={stats[statNumber] as number}
                borderWidth={0}
                color={colorType}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  secondContainer: {
    flex: 1,
    backgroundColor: colors.background.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 40,
  },
  labelBold: {
    marginVertical: 20,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  littleText: {
    width: '20%',
  },
  statValue: {
    marginRight: 20,
  },
});
