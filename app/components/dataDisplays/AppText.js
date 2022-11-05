import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

const AppText = ({
  children,
  style,
  onPress,
  ellipsizeMode,
  numberOfLines,
  family,
}) => {
  const textFamily =
    family === 'bold'
      ? 'Montserrat-Bold'
      : family === 'medium'
      ? 'Montserrat-Medium'
      : family === 'regular'
      ? 'Montserrat-Regular'
      : family === 'semi'
      ? 'Montserrat-SemiBoldItalic'
      : family === 'black'
      ? 'Montserrat-Black'
      : 'Montserrat-Bold';

  return (
    <Text
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[
        style,
        {
          /*fontFamily: textFamily*/
        },
      ]}>
      {children}
    </Text>
  );
};

AppText.propTypes = {
  numberOfLines: PropTypes.number,
};

AppText.defaultProps = {
  family: 'bold',
};

export default AppText;
