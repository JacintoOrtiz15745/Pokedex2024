import React, { memo, useContext, type ReactElement } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import { Text } from '../../atoms';
import { colors } from '../../../utils/Colors';
import Img from '../../../assets/img/Images';
import { Badge } from '../badge/Badge';
import { BackgroundTypeColors } from '../../../utils/functions/TypeColors';
import { useNavigation } from '@react-navigation/native';
import { type HomeScreenNavigationProps } from '../../../screens/types';
import { PokemonContext } from '../../../context/Context';

export interface ItemProps {
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
  pokemonId: number;
}

export const Item = memo(
  ({
    number,
    pokemonName,
    pokemonType,
    pokemonImage,
    data,
    pokemonId,
  }: ItemProps): ReactElement => {
    const navigation = useNavigation<HomeScreenNavigationProps>();
    const backgroundType = BackgroundTypeColors(pokemonType);
    const textColor =
      pokemonType === 'dark' ||
      pokemonType === 'dragon' ||
      pokemonType === 'ghost' ||
      pokemonType === 'poison'
        ? colors.text.white
        : colors.text.gray;

    const contextData = useContext(PokemonContext) as any;

    const handleOnPress = () => {
      navigation.navigate('Details', {
        number,
        pokemonName,
        pokemonType,
        pokemonImage,
        data,
      });

      contextData.setId(pokemonId);
    };

    return (
      <Pressable
        style={[
          styles.main,
          { backgroundColor: backgroundType, shadowColor: backgroundType },
        ]}
        onPress={handleOnPress}>
        <ImageBackground
          source={Img.Pattern}
          style={styles.backgroundPattern}
        />
        <ImageBackground source={Img.Pokeball_Item} style={styles.background} />

        <View style={styles.pokeInfo}>
          <Text preset="pokemonNumber" style={{ color: textColor }}>
            #{number}
          </Text>

          <Text preset="pokemonName" style={styles.pokeName} numberOfLines={1}>
            {pokemonName}
          </Text>

          <View style={styles.badgeContainer}>
            {data?.map((type, index) => {
              return (
                <Badge
                  title={type.pokemon_v2_type.name}
                  key={index + 'badge'}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.spritesContainer}>
          {pokemonImage?.pokemon_v2_pokemonsprites.map(sprites => {
            return (
              <Image
                key={sprites.sprites}
                source={{ uri: sprites.sprites }}
                style={styles.sprite}
              />
            );
          })}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    height: 115,
    borderRadius: 10,
    backgroundColor: colors.backgroundType.grass,
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  backgroundPattern: {
    height: 32,
    width: 74,
    marginLeft: 90,
    position: 'absolute',
  },
  animatedBackground: {
    right: 0,
    position: 'absolute',
  },
  background: {
    height: 115,
    width: 145,
    alignSelf: 'flex-end',
  },
  pokeName: {
    paddingBottom: 5,
    textTransform: 'capitalize',
    width: '100%',
  },
  pokeInfo: {
    position: 'absolute',
    margin: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  spritesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 20,
  },
  sprite: {
    height: 130,
    width: 130,
  },
});
