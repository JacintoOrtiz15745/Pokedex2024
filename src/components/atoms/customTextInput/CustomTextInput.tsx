import React from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { colors } from '../../../utils/Colors';
import { Constants } from '../../../utils/Constants';
import Img from '../../../assets/img/Images';

export const CustomTextInput = () => {
  return (
    <View style={styles.mainContainer}>
      <Image source={Img.Search} style={styles.icon} />
      <TextInput
        style={styles.textInput}
        placeholder={Constants.whatPokemon}
        placeholderTextColor={colors.text.gray}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    backgroundColor: colors.background.defaultInput,
    borderRadius: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 20,
    width: 20,
  },
  textInput: {
    color: colors.text.black,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    marginRight: 25,
  },
});
