import { colors } from '../../../utils/Colors';
import type { TextStyle } from 'react-native';

const baseStyles: TextStyle = {
  fontSize: 16,
  fontFamily: 'SFProDisplay-Regular',
  color: colors.text.black,
};

export const presets = {
  base: {
    ...baseStyles,
  } as TextStyle,
  descriptionSmall: {
    ...baseStyles,
    fontSize: 12,
    color: colors.text.gray,
    textAlign: 'justify',
  } as TextStyle,
  description: {
    ...baseStyles,
    color: colors.text.gray,
    textAlign: 'justify',
  } as TextStyle,
  label: {
    ...baseStyles,
    color: colors.text.white3,
  } as TextStyle,
  labelBold: {
    ...baseStyles,
    color: colors.text.white,
    fontFamily: 'SFProDisplay-Bold',
  } as TextStyle,
  pokemonType: {
    ...baseStyles,
    fontSize: 12,
    color: colors.text.white,
  } as TextStyle,
  subtitlte: {
    ...baseStyles,
    color: colors.text.black,
  } as TextStyle,
  pokemonNameNormal: {
    ...baseStyles,
    color: colors.text.black,
    textTransform: 'capitalize',
    fontWeight: '700',
  } as TextStyle,
  pokemonNumber: {
    ...baseStyles,
    fontSize: 12,
    color: colors.text.gray,
    fontFamily: 'SFProDisplay-Bold',
  } as TextStyle,
  littleText: {
    ...baseStyles,
    fontSize: 12,
    color: colors.text.black,
    fontWeight: '500',
  } as TextStyle,
  pokemonNumberBig: {
    ...baseStyles,
    fontSize: 19,
    color: colors.text.numberBig,
    fontFamily: 'SFProDisplay-Bold',
  } as TextStyle,
  pokemonName: {
    ...baseStyles,
    fontSize: 26,
    color: colors.text.white,
    fontFamily: 'SFProDisplay-Bold',
  } as TextStyle,
  pokemonNameBig: {
    ...baseStyles,
    fontSize: 30,
    color: colors.text.white,
    fontFamily: 'SFProDisplay-Bold',
    textTransform: 'capitalize',
  } as TextStyle,
  title: {
    ...baseStyles,
    fontSize: 32,
    fontFamily: 'SFProDisplay-Bold',
  } as TextStyle,
  backgroundTitle: {
    ...baseStyles,
    fontSize: 120,
    fontFamily: 'Milestone Outline',
    color: colors.text.white,
    textTransform: 'uppercase',
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;
