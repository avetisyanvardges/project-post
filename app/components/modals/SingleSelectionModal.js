import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
//Data Displays
import AppText from '../dataDisplays/AppText';
//Theme Constants
import {colors, theme} from '../../config/theme';

function SinglSelectionModal({
  isModalVisible,
  setIsModalVisible,
  title,
  subTitle,
  list,
  onSelectFunction,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View style={styles.container}>
        {/*  Touchable Space surrounding Modal to close Modal  */}
        <TouchableWithoutFeedback
          onPress={() => setIsModalVisible(!isModalVisible)}>
          <View style={styles.overlay}>
            <LinearGradient
              colors={[colors.black, colors.black]}
              style={{flex: 1, opacity: 0.8}}
            />
          </View>
        </TouchableWithoutFeedback>

        {/*  Modal: Seperated by Header and Flalist (profiles)  */}
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <AppText style={{fontSize: 22, color: theme.modal.textColor}}>
                {title}
              </AppText>
              {subTitle ? (
                <AppText style={{fontSize: 12, color: theme.modal.textColor}}>
                  {subTitle}
                </AppText>
              ) : null}
            </View>
          </View>
          <View style={styles.separator} />
          <ScrollView
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              paddingBottom: 20,
            }}>
            {list.map(element => {
              return (
                <>
                  <TouchableOpacity onPress={() => onSelectFunction(element)}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <AppText
                        style={{
                          color: colors.white,
                          fontSize: 18,
                          paddingVertical: 10,
                        }}>
                        {element}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  modalContainer: {
    backgroundColor: theme.modal.backgroundColor,
    height: '70%',
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.1,
    margin: 5,
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: theme.modal.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    height: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    borderRadius: 8,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});

SinglSelectionModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  travelerList_data: PropTypes.array,
};

SinglSelectionModal.defaultProps = {
  travelerList_data: [],
};

export default SinglSelectionModal;
