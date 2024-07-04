import React, { type ReactElement, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

interface SpinLoopProps {
  children: ReactElement;
}

export const SpinLoop = ({ children }: SpinLoopProps): ReactElement => {
  const spinValue = new Animated.Value(0);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };
  spin();

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      {children}
    </Animated.View>
  );
};
