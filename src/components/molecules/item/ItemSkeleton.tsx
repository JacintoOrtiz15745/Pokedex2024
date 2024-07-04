import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import Img from '../../../assets/img/Images';
import { colors } from '../../../utils/Colors';

export const ItemSkeleton = () => {
  return (
    <SkeletonContainer animation='wave' speed={1000} backgroundColor={colors.background.modal}>
      <Skeleton style={styles.main}>
        <ImageBackground
          source={Img.Pattern}
          style={styles.backgroundPattern}
        />
        <ImageBackground source={Img.Pokeball_Item} style={styles.background} />
      </Skeleton>
    </SkeletonContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 115,
    borderRadius: 10,
    marginTop: 30,
  },
  backgroundPattern: {
    height: 32,
    width: 74,
    marginLeft: 90,
    position: 'absolute',
  },
  background: {
    height: 115,
    width: 145,
    alignSelf: 'flex-end',
    paddingLeft: 20,
  },
});
