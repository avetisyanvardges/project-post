import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Icon from '../svgIcons/Icon';
import * as ImagePicker from 'react-native-image-picker';
import {colors} from '../../config/theme';

function ImageInput({imageUri, onChangeImage}) {
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert('You need to enable permission to access the library.');
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {text: 'Yes', onPress: () => onChangeImage(null)},
        {text: 'No'},
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) {
        // const response = await fetch(result.uri);

        const cleaned = result.uri.replace('file://', '');
        const rsp = await fetch(cleaned);

        // console.log('fetchResponse', rsp);
        const blob = new Blob(result.uri, {type: 'image/jpeg'});

        // const blob = await cleaned.blob();
        console.log('blob', blob);
        // uploadAsFile("r")
      }
    } catch (error) {
      console.log('Error reading an image', error);
    }
  };

  const uploadAsFile = async result => {
    // console.log("uploadAsFile", result.uri)
    const cleaned = result.uri.replace('file://', '');
    const response = await fetch(cleaned);
    const blob = await response.blob();

    var metadata = {
      contentType: 'image/jpeg',
    };

    let name = new Date().getTime() + '-media.jpg';

    // const task = ref.put(blob, metadata);
    console.log('------', response);
    // console.log(metadata)
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <Icon name="camera" size={40} fill={colors.red} />}
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImageInput;
