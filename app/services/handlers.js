import React from 'react';
import {gql, useApolloClient} from '@apollo/client';
import {Alert} from 'react-native';

export const buildQueryResult = props => {
  const {result, resultQueryKey} = props;
  if (result) {
    return {data: result[resultQueryKey]};
  }
  return null;
};

export const buildQueryCollectionResult = props => {
  const {result, resultQueryKey, resultCollectionKey} = props;
  if (!result) {
    return null;
  }
  if (result) {
    return {
      data: result[resultQueryKey]?.[resultCollectionKey],
      collectionInfo: result[resultQueryKey]?.pageInfo,
    };
  }
  return null;
};

export const handleAlert = (title, message, onPress, buttonTitle) => {
  if (!onPress) {
    Alert.alert(title, message);
  } else {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: buttonTitle,
        onPress: () => onPress && onPress(),
        style: 'destructive',
      },
    ]);
  }
};
