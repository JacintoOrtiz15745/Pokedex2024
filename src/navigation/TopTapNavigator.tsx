import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { About, Evolution, Stats } from '../screens';
import { colors } from '../utils/Colors';
import { Image } from 'react-native-animatable';
import Img from '../assets/img/Images';
import { Text } from '../components';

interface TopTapNavigatorProps {
  backgroundType: string | undefined;
  pokemonType: string | undefined;
}

const Tab = createMaterialTopTabNavigator();

export const TopTapNavigator = ({
  backgroundType,
  pokemonType,
}: TopTapNavigatorProps): ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.text.white,
        tabBarInactiveTintColor: colors.text.white3,
        tabBarStyle: {
          backgroundColor: backgroundType,
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: backgroundType,
        },
        tabBarIcon: ({ focused }) => {
          return (
            focused && (
              <Image source={Img.PokeballTopBar} style={styles.tabBarIcon} />
            )
          );
        },
        tabBarLabel: ({ focused }) => {
          return (
            <View style={styles.tabBarLabel}>
              <Text
                preset={focused ? 'labelBold' : 'label'}
                style={styles.tabBarLabelText}>
                {route.name}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="About"
        component={About}
        initialParams={{ backgroundType, pokemonType }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        initialParams={{ backgroundType, pokemonType }}
      />
      <Tab.Screen
        name="Evolution"
        component={Evolution}
        initialParams={{ backgroundType, pokemonType }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  tabBarLabel: {
    width: 70,
  },
  tabBarLabelText: {
    alignSelf: 'center',
  },
});
