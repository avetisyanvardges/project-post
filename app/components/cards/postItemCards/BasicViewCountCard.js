import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Avatar from '../../dataDisplays/Avatar';
import Icon from '../../svgIcons/Icon';
import SaveOutlined from '../../inputs/buttons/SaveOutlined';

import {colors} from '../../../config/theme';

const BasicViewCountCard = ({onPress, thumbnail}) => {
  let {width} = Dimensions.get('window');

  let itemWidth = width / 3;
  let itemHeight = width / 1.75;

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress()}
      onLongPress={null}
      onPressOut={null}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={{uri: thumbnail}}
          // source={item.image}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <View
            style={[styles.overlay, {width: itemWidth}, {height: itemHeight}]}>
            <LinearGradient
              colors={[colors.black, 'transparent', 'transparent']}
              style={{flex: 1, opacity: 0.5}}
            />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="play-button" size={25} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // justifyContent: "center",
    alignItems: 'flex-end',
    margin: 10,
  },
  title: {
    color: colors.white,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, .6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontSize: 24,
  },
  overlay: {
    // position: "absolute",
    // right: 0,
    // bottom: 0,
    // left: 0,
  },
});

export default BasicViewCountCard;
