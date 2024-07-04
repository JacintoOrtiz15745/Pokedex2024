import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './src/navigation/MainNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Context } from './src/context/Context';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Context>
      <GestureHandlerRootView style={styles.GestureHandlerRootView}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </ApolloProvider>
      </GestureHandlerRootView>
    </Context>
  );
}

const styles = StyleSheet.create({
  GestureHandlerRootView: {
    flex: 1,
  },
});
