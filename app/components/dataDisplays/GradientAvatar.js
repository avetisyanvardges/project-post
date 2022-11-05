import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {theme, colors} from '../../config/theme';
import PropTypes from 'prop-types';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const Avatar = ({image, size}) => {
  const [valid, setValid] = useState(true);

  const avatarSize =
    size === 'xs'
      ? theme.avatar.xs
      : size === 'sm'
      ? theme.avatar.sm
      : size === 'lg'
      ? theme.avatar.lg
      : size === 'md'
      ? theme.avatar.md
      : theme.avatar.md;

  const placeholder = require('../../assets/avatar-stock-ph.jpg');

  const avatarContainer = {
    width: avatarSize,
    height: avatarSize,

    borderRadius: avatarSize / 2,
    resizeMode: 'cover',
    marginHorizontal: 8,
    marginVertical: 5,
  };

  const gradientContainer = {
    width: avatarSize + 8,
    height: avatarSize + 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (avatarSize + 8) / 2,
  };

  return (
    <LinearGradient
      colors={[colors.blue, colors.silver]}
      style={gradientContainer}>
      <Image
        onError={() => setValid(false)}
        style={avatarContainer}
        source={
          valid
            ? (image !== '') & (image !== null)
              ? {uri: image}
              : placeholder
            : placeholder
        }
        defaultSource={placeholder}
      />
    </LinearGradient>
  );
};

Avatar.defaultProps = {
  size: 'md',
};

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
};

export default Avatar;
