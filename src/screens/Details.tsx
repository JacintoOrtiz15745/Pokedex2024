import React, { useCallback, useRef, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { BackgroundTypeColors } from '../utils/functions/TypeColors';
import Img from '../assets/img/Images';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Badge, Text } from '../components';
import { SpinLoop, MovingView } from '../utils/animations';
import * as Animatable from 'react-native-animatable';
import { type RootStackParamList } from './types';
import { TopTapNavigator } from '../navigation/TopTapNavigator';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

type DetailsScreenRouteProps = RouteProp<RootStackParamList, 'Details'>;

export const Details = (): ReactElement => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProps>();
  const { number, pokemonName, pokemonType, data, pokemonImage } = route.params;
  const backgroundType = BackgroundTypeColors(pokemonType);
  const [sheetPosition, setSheetPosition] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetPosition(index);
  }, []);

  return (
    <View style={[styles.mainContainer, { backgroundColor: backgroundType }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}>
        <Image source={Img.Back} style={styles.icon} />
      </Pressable>

      {sheetPosition === 0 ? (
        <Animatable.View animation={sheetPosition ? 'fadeOut' : 'fadeIn'}>
          <View style={styles.movingContainer}>
            <MovingView
              children={
                <Text preset="backgroundTitle" style={styles.text}>
                  {pokemonName}
                </Text>
              }
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.animatable}>
              {pokemonImage?.pokemon_v2_pokemonsprites.map(
                (sprites: { sprites: string }) => {
                  return (
                    <View key={sprites.sprites}>
                      <SpinLoop>
                        <Image source={Img.Circle} style={styles.circle} />
                      </SpinLoop>
                      <Image
                        source={{ uri: sprites.sprites }}
                        style={styles.img}
                      />
                    </View>
                  );
                },
              )}
            </View>

            <View style={styles.nameAndNumber}>
              <Text preset="pokemonNumberBig">#{number}</Text>
              <Text preset="pokemonNameBig" numberOfLines={1}>
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
          </View>
          <Animatable.View
            style={styles.patternContainer}
            animation={'fadeInLeft'}>
            <Image source={Img.PatternLarge} style={styles.patternLarge} />
          </Animatable.View>
        </Animatable.View>
      ) : (
        <Animatable.View animation={'fadeIn'}>
          <Text preset="pokemonNameBig" style={styles.pokemonNameBig}>
            {pokemonName}
          </Text>
          <Animatable.View
            style={styles.patternContainerOnClose}
            animation={'fadeInLeft'}>
            <Image source={Img.PatternLarge} style={styles.patternLarge} />
          </Animatable.View>
        </Animatable.View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['72%', '90%']}
        onChange={handleSheetChanges}
        handleComponent={null}>
        <BottomSheetView style={styles.topTapNavigator}>
          <TopTapNavigator
            backgroundType={backgroundType}
            pokemonType={pokemonType}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    height: 50,
    width: 50,
  },
  icon: {
    height: 25,
    width: 25,
    left: 40,
    top: 40,
  },
  text: {
    width: '120%',
    opacity: 0.2,
  },
  movingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
  },
  animatable: {
    alignItems: 'center',
    height: 125,
  },
  img: {
    height: 125,
    width: 125,
    position: 'absolute',
  },
  circle: {
    height: 130,
    width: 130,
  },
  nameAndNumber: {
    justifyContent: 'center',
    marginLeft: 25,
    width: '50%',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  patternContainer: {
    position: 'absolute',
    right: 0,
    top: 160,
  },
  patternContainerOnClose: {
    position: 'absolute',
    right: 0,
    top: 27,
  },
  patternLarge: {
    height: 65,
    width: 65,
  },
  pokemonNameBig: {
    position: 'absolute',
    alignSelf: 'center',
    top: 32,
  },
  topTapNavigator: {
    flex: 1,
  },
  headerIndicator: {
    height: 0,
  },
});
