import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from '../../svgIcons/Icon';

import {colors} from '../../../config/theme';

const BasicSelectCountCard = ({
  type,
  thumbnail,
  onSelectItem,
  isItemSelected,
}) => {
  let {width} = Dimensions.get('window');

  let itemWidth = width / 3;
  let itemHeight = width / 1.75;

  return (
    <TouchableWithoutFeedback
      onPress={type === 'Selectable' ? () => onSelectItem() : null}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={{uri: thumbnail}}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          {type === 'Selectable' ? (
            !isItemSelected ? (
              <View style={{width: itemWidth, height: itemHeight}}>
                <LinearGradient
                  colors={[colors.black, 'transparent', 'transparent']}
                  style={{flex: 1, opacity: 0.5}}
                />
              </View>
            ) : null
          ) : null}
          {type === 'Selectable' ? (
            <View style={styles.iconContainer}>
              {isItemSelected ? (
                <View
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: colors.white,
                  }}>
                  <Icon name="check" size={14} fill={colors.charcoal} />
                </View>
              ) : (
                <View
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: colors.grey,
                  }}>
                  <Icon name="plus" size={14} fill={colors.charcoal} />
                </View>
              )}
            </View>
          ) : null}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 10,
  },
});

export default BasicSelectCountCard;
