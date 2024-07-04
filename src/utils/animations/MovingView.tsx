import React, { type ReactElement, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface MovingViewProps {
  children: ReactElement;
}
export const MovingView = ({ children }: MovingViewProps) => {
  const translateX = new Animated.Value(-10); // Initial position of the view, starting off-screen

  useEffect(() => {
    // Function to create the animation loop
    const animate = () => {
      Animated.sequence([
        // Move the view to the right (on-screen)
        Animated.timing(translateX, {
          toValue: 10, // End value of the animation (position at which the view moves off-screen)
          duration: 5000, // Duration of the animation in milliseconds
          useNativeDriver: true, // Enable native driver for better performance
        }),
        // Reset the position of the view to the left (off-screen)
        Animated.timing(translateX, {
          toValue: -10, // Start value of the animation (position off-screen)
          duration: 5000, // Duration 0 to make the transition instantaneous
          useNativeDriver: true, // Enable native driver for better performance
        }),
      ]).start(() => animate()); // Start the animation loop
    };

    animate(); // Start the animation loop

    // Clean up the animation when the component unmounts
    return () => translateX.stopAnimation();
  }, []); // Run the effect only once on mount

  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: [
            {
              translateX: translateX,
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
  },
});
