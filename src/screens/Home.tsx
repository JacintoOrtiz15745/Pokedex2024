import React, { type ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import Img from '../assets/img/Images';
import { Text, CustomTextInput, Item, ItemSkeleton } from '../components';
import { Constants } from '../utils/Constants';
import { gql, useQuery } from '@apollo/client';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../utils/Colors';

interface Pokemon {
  name: string;
  id: number;
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
}

const QUERY = gql`
  query Pokemon($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      pokemon_v2_pokemonsprites {
        sprites(path: "other.home.front_default")
        # sprites(path: "other.home.front_shiny")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const Home = (): ReactElement => {
  const { data, fetchMore } = useQuery(QUERY, {
    variables: { limit: 50, offset: 0 },
  });
  const [pokemonData, setPokemonData] = useState<Pokemon[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setPokemonData(data?.pokemon_v2_pokemon);
  }, [data]);

  const loadMoreData = () => {
    setLoading(true);
    setOffset(offset + 50);
  };

  useEffect(() => {
    if (offset > 0) {
      fetchMore({
        variables: { offset: offset },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            pokemon_v2_pokemon: [
              ...prev.pokemon_v2_pokemon,
              ...fetchMoreResult.pokemon_v2_pokemon,
            ],
          };
        },
      }).then(() => {
        setLoading(false);
      });
    }
  }, [offset]);

  return (
    <View style={styles.mainCointainer}>
      <Image source={Img.Pokeball} style={styles.img} />
      <View style={styles.secondMainContainer}>
        <View style={styles.iconContainer}>
          <Pressable>
            <Image source={Img.Generations} style={styles.icon} />
          </Pressable>

          <Pressable>
            <Image source={Img.Sort} style={styles.icon} />
          </Pressable>

          <Pressable>
            <Image source={Img.Filters} style={styles.icon} />
          </Pressable>
        </View>

        <Text preset="title" style={styles.title}>
          {Constants.pokedex}
        </Text>

        <Text preset="description" style={styles.subtitle}>
          {Constants.search}
        </Text>

        <View style={styles.buttonView}>
          <CustomTextInput />
        </View>

        {pokemonData === undefined && (
          <>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </>
        )}

        <View style={styles.flashListContainer}>
          <FlashList
            data={pokemonData}
            keyExtractor={pokemonData => pokemonData.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            estimatedItemSize={1000}
            renderItem={({ item, index }) => (
              <Item
                number={
                  item.id >= 100
                    ? item.id.toString()
                    : item.id <= 9
                    ? '00' + item.id.toString()
                    : '0' + item.id.toString()
                }
                pokemonName={item.name}
                pokemonImage={item}
                pokemonType={
                  item.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
                }
                data={item.pokemon_v2_pokemontypes}
                key={item.id.toString()}
                pokemonId={index + 1}
              />
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
            ListFooterComponent={loading ? <ItemSkeleton /> : null}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  secondMainContainer: {
    padding: 40,
  },
  img: {
    width: '100%',
    position: 'absolute',
  },
  icon: {
    height: 25,
    width: 25,
    marginLeft: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  title: {
    paddingTop: 38,
  },
  subtitle: {
    paddingTop: 10,
  },
  buttonView: {
    paddingTop: 25,
    paddingBottom: 15,
  },
  flashListContainer: {
    height: '100%',
  },
  contentContainerStyle: {
    paddingBottom: 400,
  },
});
