import {StyleSheet} from 'react-native';
import {CAMERA_CONSTANTS} from '../../../config/constants';

const Styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    button: {
      marginBottom: 10,
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
      backgroundColor: 'rgba(140, 140, 140, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionSheetContainer: {
      position: 'absolute',
      right: CAMERA_CONSTANTS.safeAreaPadding.paddingRight,
      top: CAMERA_CONSTANTS.safeAreaPadding.paddingTop + 20,
    },
    text: {
      color: 'white',
      fontSize: 11,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
};

export {Styles};
