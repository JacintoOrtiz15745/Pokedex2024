import React, { type ReactElement } from 'react';
import { Text as RNText } from 'react-native';
import type { TextProps } from 'react-native';
import { presets } from './presets';
import type { TextPresets } from './presets';

interface CustomTextProps extends TextProps {
  preset?: TextPresets;
  fitContent?: boolean;
}

export const Text = ({
  preset,
  fitContent = false,
  style,
  ...rest
}: CustomTextProps): ReactElement => {
  const baseStyles = preset !== undefined ? presets[preset] : presets.base;
  const styles = [baseStyles, style];

  if (fitContent) {
    return (
      <RNText>
        <RNText style={styles} {...rest} />
      </RNText>
    );
  }
  return <RNText style={styles} {...rest} />;
};
