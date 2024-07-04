import React, { memo, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../atoms';
import { IconType, TypeColors } from '../../../utils/functions/TypeColors';
import { colors } from '../../../utils/Colors';

interface BadgeProps {
  title: string;
  onlyIcon?: boolean;
}

export const Badge = memo(
  ({ title, onlyIcon = false }: BadgeProps): ReactElement => {
    const colorType = TypeColors(title);
    const Icon = IconType(title);

    return (
      <View
        style={[
          styles.main,
          { backgroundColor: colorType, borderRadius: onlyIcon ? 3 : 0 },
        ]}>
        <Icon width={15} height={15} fill={colors.background.white} />
        {onlyIcon === false && (
          <Text preset="pokemonType" style={styles.text}>
            {title}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    borderRadius: 3,
    padding: 5,
    marginRight: 5,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 5,
    textTransform: 'capitalize',
  },
});
