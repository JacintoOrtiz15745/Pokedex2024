import React, { useContext, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../utils/Colors';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { type RootStackParamList } from './types';
import { Text } from '../components';
import { Constants } from '../utils/Constants';
import { TypeColors } from '../utils/functions/TypeColors';
import { gql, useQuery } from '@apollo/client';
import { PokemonContext } from '../context/Context';
import { Image } from 'react-native-animatable';
import Img from '../assets/img/Images';
import { ScrollView } from 'react-native-gesture-handler';

type AboutScreenRouteProps = RouteProp<RootStackParamList, 'Evolution'>;

export const Evolution = (): ReactElement => {
  const route = useRoute<AboutScreenRouteProps>();
  const { backgroundType, pokemonType } = route.params;
  const colorType = TypeColors(pokemonType);

  const QUERY = gql`
    query ($id: Int!) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        pokemon_v2_pokemonspecy {
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              name
            }
          }
        }
      }
    }
  `;

  const QUERYEVOLUTIONS = gql`
    query ($name: [String!]) {
      pokemon_v2_pokemon(where: { name: { _in: $name } }) {
        pokemon_v2_pokemonsprites {
          sprites(path: "other.home.front_default")
        }
        id
      }
    }
  `;

  const contextData = useContext(PokemonContext) as any;
  const { data } = useQuery(QUERY, { variables: { id: contextData.id } });
  const evolutions =
    data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map(
      (name: any) => name.name,
    );

  const sprites = useQuery(QUERYEVOLUTIONS, {
    variables: { name: evolutions },
  });
  const evolutionSprites = sprites?.data?.pokemon_v2_pokemon?.map(
    (pokemon: any) => pokemon.pokemon_v2_pokemonsprites[0].sprites,
  );
  const pokemonId = sprites?.data?.pokemon_v2_pokemon?.map((id: any) => id.id);

  return (
    <View style={[styles.mainContainer, { backgroundColor: backgroundType }]}>
      <ScrollView
        style={styles.secondContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.thirdContainer}>
          <Text
            preset="labelBold"
            style={[styles.labelBold, { color: colorType }]}>
            {Constants.evolutionChart}
          </Text>

          {sprites.data && (
            <View style={styles.evolutionContainer}>
              {evolutions?.map((name: string, index: number) => {
                return (
                  <View style={styles.imgContainer} key={index}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Img.PokeballBackground}
                        style={styles.img}
                      />
                      <Image
                        source={{ uri: evolutionSprites[index as number] }}
                        style={styles.spritePokemon}
                      />
                    </View>

                    <Text preset="descriptionSmall">
                      #{' '}
                      {pokemonId[index as number] < 10
                        ? '00' + pokemonId[index as number]
                        : pokemonId[index as number] < 99
                        ? '0' + pokemonId[index as number]
                        : pokemonId[index as number]}
                    </Text>

                    <Text preset="pokemonNameNormal">{name}</Text>
                  </View>
                );
              })}
            </View>
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
    height: '100%',
    backgroundColor: colors.background.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  thirdContainer: {
    margin: 40,
  },
  labelBold: {
    marginTop: 20,
  },

  evolutionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  imgContainer: {
    marginTop: 30,
    width: '48%',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
  },
  spritePokemon: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
});
