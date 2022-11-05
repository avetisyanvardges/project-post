import React, {useState, useMemo} from 'react';
import {StyleSheet, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import {
  offsetLimitPagination,
  concatPagination,
} from '@apollo/client/utilities';
import {onError} from '@apollo/client/link/error';

import RootStack from './app/navigations/RootStack';
import {AuthContext} from './app/config/context';
import {colors} from './app/config/theme';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`);
    });
  }
});

//Production Server
const link = new HttpLink({uri: 'http://54.177.179.113/graphql/'});

//Development Server
//const link = new HttpLink({uri: 'http://54.241.96.50/graphql/'});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          postComments: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          user: {
            merge(existing = {}, incoming) {
              return {...existing, ...incoming};
            },
          },
          comment: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          usersFollowing: {
            merge(existing = [], incoming) {
              return {...existing, ...incoming};
            },
          },
          userFollowers: {
            merge(existing = [], incoming) {
              return {...existing, ...incoming};
            },
          },
          usersFollowingAggregate: {
            merge(existing = {}, incoming) {
              return {...existing, ...incoming};
            },
          },
          discoveryFeeds: concatPagination(),
          // {
          //   keyArgs: 'userId',
          //   merge(existing = [], incoming) {
          //     return [...existing, ...incoming];
          //   },
          //   merge(existing, incoming, {args: {offset = 0}}) {
          //     // Slicing is necessary because the existing data is
          //     // immutable, and frozen in development.
          //     const merged = existing ? existing.slice(0) : [];
          //     for (let i = 0; i < incoming.length; ++i) {
          //       merged[offset + i] = incoming[i];
          //     }
          //     return merged;
          //   },
          // },
          // },
        },
      },
    },
  }),
});

export default function App() {
  // const [userToken, setUserToken] = useState(20210028);
  const [userToken, setUserToken] = useState(20210006);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setUserToken('abcde');
      },
      signUp: () => {
        setUserToken('abcde');
      },
      SignOut: () => {
        setUserToken(null);
      },
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={userToken}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <NavigationContainer
                theme={{
                  colors: {
                    primary: colors.blue,
                    background: colors.darkCharcoal,
                  },
                }}
                style={styles.container}>
                {userToken ? <RootStack /> : <View />}
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
