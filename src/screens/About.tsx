import React, { type ReactElement, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../utils/Colors';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { type RootStackParamList } from './types';
import { gql, useQuery } from '@apollo/client';
import { PokemonContext } from '../context/Context';
import { Badge, Text } from '../components';
import { Constants } from '../utils/Constants';
import { SpinLoop } from '../utils/animations';
import Img from '../assets/img/Images';
import { filterWeakness } from '../utils/functions/FilterWeakness';
import { TypeColors } from '../utils/functions/TypeColors';
import { ScrollView } from 'react-native-gesture-handler';

type AboutScreenRouteProps = RouteProp<RootStackParamList, 'About'>;

export const About = (): ReactElement => {
  const QUERY = gql`
    query ($id: Int!) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        height
        weight
        base_experience
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonspecy {
          base_happiness
          capture_rate
          hatch_counter
          pokemon_v2_pokemonegggroups {
            pokemon_v2_egggroup {
              name
            }
          }
          pokemon_v2_pokemonspeciesflavortexts(limit: 1) {
            flavor_text
          }
          pokemon_v2_growthrate {
            name
          }
        }
      }
    }
  `;

  const route = useRoute<AboutScreenRouteProps>();
  const { backgroundType, pokemonType } = route.params;
  const colorType = TypeColors(pokemonType);
  const contextData = useContext(PokemonContext) as any;
  const { data } = useQuery(QUERY, { variables: { id: contextData.id } });
  const filteredWeaknesses = filterWeakness(pokemonType);
  const description =
    data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text.replace(
      /[\n\f]/g,
      ' ',
    );
  const dataPokemon: any = {
    height: data?.pokemon_v2_pokemon[0].height / 10,
    weight: data?.pokemon_v2_pokemon[0].weight / 10,
  };

  const abilities = {
    abilities: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities,
  };

  const training: any = {
    catchRate: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.capture_rate,
    baseHappiness:
      data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.base_happiness,
    baseExp: data?.pokemon_v2_pokemon[0].base_experience,
    growthRate:
      data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_growthrate
        .name,
  };

  const breeding: any = {
    eggGroups:
      data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
        .pokemon_v2_pokemonegggroups,
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: backgroundType }]}>
      <ScrollView
        style={styles.secondContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.thirdContainer}>
          {!data ? (
            <View style={styles.spinLoop}>
              <SpinLoop>
                <Image source={Img.PokeballLoader} style={styles.circle} />
              </SpinLoop>
            </View>
          ) : (
            <>
              <Text preset="description" style={styles.description}>
                {description}
              </Text>

              <Text
                preset="labelBold"
                style={[styles.labelBold, { color: colorType }]}>
                {Constants.pokedextData}
              </Text>

              {Object.keys(dataPokemon).map((value: any, index: number) => {
                const height =
                  value === 'height' && dataPokemon[value] >= 1
                    ? dataPokemon[value] + ' m'
                    : dataPokemon[value] + ' cm';
                const weight =
                  value === 'weight' && dataPokemon[value] >= 1
                    ? dataPokemon[value] + ' kg'
                    : dataPokemon[value] + ' gr';

                return (
                  <View style={styles.textContainer} key={index}>
                    <Text preset="littleText" style={styles.littleText}>
                      {Constants[value]}
                    </Text>
                    <Text preset="description">
                      {value === 'height' ? height : weight}
                    </Text>
                  </View>
                );
              })}

              <View style={styles.textContainer}>
                <Text preset="littleText" style={styles.littleText}>
                  {Constants.abilities}
                </Text>
                <View>
                  {abilities.abilities.map((data: any, index: number) => {
                    return (
                      <View
                        style={index == 0 && styles.abilitiesContainer}
                        key={index + 'container'}>
                        <Text
                          preset={
                            index === 0 ? 'description' : 'descriptionSmall'
                          }
                          key={index + 'description'}
                          style={styles.abilities}>
                          {index === 0 ? '1. ' : ''}
                          {data.pokemon_v2_ability.name}
                        </Text>
                        {index !== 0 && (
                          <Text
                            preset={'descriptionSmall'}
                            key={index + 'hidden'}>
                            {Constants.hidenAbilities}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.textContainerNoMargin}>
                <Text preset="littleText" style={styles.littleText}>
                  {Constants.weaknesses}
                </Text>
                <View style={styles.weaknessesIcons}>
                  {filteredWeaknesses?.map((name: string, index: number) => {
                    return <Badge title={name} onlyIcon key={index} />;
                  })}
                </View>
              </View>

              <Text
                preset="labelBold"
                style={[styles.labelBold, { color: colorType }]}>
                {Constants.training}
              </Text>

              {Object.keys(training).map((value: string, index: number) => {
                return (
                  <View style={styles.textContainer} key={index}>
                    <Text preset="littleText" style={styles.littleText}>
                      {Constants[value]}
                    </Text>
                    <Text preset="description" style={styles.capitalize}>
                      {training[value]}
                    </Text>
                  </View>
                );
              })}

              <Text
                preset="labelBold"
                style={[styles.labelBold, { color: colorType }]}>
                {Constants.breeding}
              </Text>

              <View style={styles.textContainer}>
                <Text preset="littleText" style={styles.littleText}>
                  {Constants.eegGroups}
                </Text>

                {breeding.eggGroups.map((name: any, index: number) => {
                  return (
                    <Text
                      preset="description"
                      style={styles.capitalize}
                      key={index}>
                      {name.pokemon_v2_egggroup.name + ' '}
                    </Text>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
  },
  thirdContainer: {
    margin: 40,
  },
  spinLoop: {
    alignItems: 'center',
    marginTop: '50%',
  },
  circle: {
    height: 130,
    width: 130,
  },
  description: {
    marginBottom: 10,
  },
  labelBold: {
    marginVertical: 20,
  },
  textContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  textContainerNoMargin: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  weaknessesIcons: {
    flexDirection: 'row',
  },
  abilitiesContainer: {
    flexDirection: 'row',
  },
  abilities: {
    textTransform: 'capitalize',
  },
  littleText: {
    width: '50%',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});
