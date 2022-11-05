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

import AppText from '../../dataDisplays/AppText';

import {colors} from '../../../config/theme';

const SavableDetailedCard = ({
  thumbnail,
  avatar,
  name,
  price,
  rating,
  onPress,
}) => {
  let {width} = Dimensions.get('window');

  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = () => {
    setIsSaved(prevState => !prevState);
    if (isSaved == true) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  };

  let itemWidth = width / 2.1;
  let itemHeight = width / 1.45;

  return (
    <TouchableWithoutFeedback
      onPress={() => (onPress ? onPress : console.log('post press'))}
      onLongPress={null}
      onPressOut={null}>
      <View style={[{width: itemWidth}, {height: itemHeight, padding: 6}]}>
        <ImageBackground
          source={thumbnail}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <View style={{flex: 1}}>
            <View
              style={[
                styles.overlay,
                {width: itemWidth},
                {height: itemHeight},
              ]}>
              <LinearGradient
                colors={[colors.black, 'transparent', 'transparent']}
                style={{flex: 1, opacity: 0.5}}
              />

              <LinearGradient
                colors={['transparent', colors.black]}
                style={{flex: 1, opacity: 0.5}}
              />
            </View>
            <View style={styles.overlay}>
              <View style={headerStyles.container}>
                <View style={headerStyles.nameContainer}>
                  <AppText numberOfLines={2} style={headerStyles.name}>
                    {name}
                  </AppText>
                </View>
                <View style={headerStyles.priceContainer}>
                  {price ? (
                    <AppText style={headerStyles.price}>${price}</AppText>
                  ) : null}
                </View>
              </View>
              <View style={footerStyles.container}>
                <View style={footerStyles.profileContainer}>
                  <View style={footerStyles.ratingContainer}>
                    <Icon name="star" size={18} fill={colors.blue} />
                    <AppText style={footerStyles.rating}>{rating}/5</AppText>
                  </View>
                  <Avatar image={avatar} size="xs" mh={0} />
                </View>
                <View style={footerStyles.bookmarkContainer}>
                  <SaveOutlined
                    size={28}
                    toggleSave={toggleSave}
                    isTranslucent={true}
                    isSaved={isSaved}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    flex: 1,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  price: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 25,
  },
});

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'column-reverse',
    flex: 1,
    marginLeft: 10,
  },
  ratingContainer: {flexDirection: 'row', alignItems: 'center'},
  rating: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 2,
  },
  bookmarkContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    flexDirection: 'column-reverse',
  },
});

export default SavableDetailedCard;
