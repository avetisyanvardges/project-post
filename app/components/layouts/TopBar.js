import React, {useMemo} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {theme, colors} from '../../config/theme';

import PropTypes from 'prop-types';

const TopBar = ({
  children,
  leftBtn,
  leftOnPress,
  rightBtn,
  rightOnPress,
  secRightBtn,
  secRightOnPress,
  border,
  barStyle,
}) => {
  const {top: paddingTop} = useSafeAreaInsets();

  const borderColor = border === false ? 'transparent' : '#ffffff50';

  const bottomBorder = {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  };

  return (
    <View style={[{paddingTop}, styles.container, bottomBorder, barStyle]}>
      {/* <TouchableOpacity onPress={leftOnPress}> */}
      <View style={styles.buttonContainer}>
        {leftBtn && (
          <Pressable style={styles.leftBtn} onPress={leftOnPress}>
            <View>{leftBtn}</View>
          </Pressable>
        )}
      </View>
      {/* </TouchableOpacity> */}
      {children ? (
        <View style={[styles.titleContainer]}>
          <Text style={styles.title}>{children}</Text>
        </View>
      ) : null}
      <View style={[styles.buttonContainer, {flexDirection: 'row-reverse'}]}>
        {rightBtn && (
          <Pressable onPress={rightOnPress}>
            <View style={styles.rightBtn}>{rightBtn}</View>
          </Pressable>
        )}
        {secRightBtn && (
          <Pressable onPress={secRightOnPress}>
            <View style={styles.rightBtn}>{secRightBtn}</View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.padding.paddingMedium,
    backgroundColor: theme.backgroundColor,
    marginHorizontal: theme.topBar.margin,
  },
  buttonContainer: {flex: 1},
  titleContainer: {
    alignItems: 'center',
    textAlign: 'center',
    flexGrow: 2.5,
  },
  title: {
    fontSize: theme.topBar.fontSize,
    textAlign: 'center',
    fontWeight: theme.topBar.titleWeight,
    color: theme.text.primary,
    paddingVertical: theme.topBar.titlePadding,
  },
  leftBtn: {
    color: colors.white,
    fontWeight: '500',
    paddingVertical: theme.topBar.titlePadding,
  },
  rightBtn: {
    color: colors.white,
    textAlign: 'right',
    fontWeight: '500',
    flexDirection: 'row-reverse',
    paddingVertical: theme.topBar.titlePadding,
  },
});

TopBar.defaultProps = {
  border: true,
};

TopBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  leftOnPress: PropTypes.func,
  rightOnPress: PropTypes.func,
  leftBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  rightBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  border: PropTypes.bool,
};

export default TopBar;
