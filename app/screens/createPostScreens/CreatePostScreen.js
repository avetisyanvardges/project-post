import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Camera} from 'loop-vision-camera';
import {
  VESDK,
  VideoEditorModal,
  Configuration,
} from 'react-native-videoeditorsdk';
import {colors} from '../../config/theme';
import AppText from '../../components/dataDisplays/AppText';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import {NAVIGATION_PARAM} from '../../config/routes';

const requestSavePermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) {
    return false;
  }
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

function CreatePostScreen({navigation}) {
  const [resourcePath, setResourcePath] = useState({});
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission == 'denied') {
      alert(
        'You will need to enable camera permissions in order to utilize Live Recording Features.',
      );
    }
    setCameraPermissionStatus(permission);
  };

  const requestMicrophonePermission = async () => {
    const permission = await Camera.requestMicrophonePermission();
    if (permission == 'denied') {
      alert(
        'You will need to enable microphone permissions in order to utilize Live Recording Features.',
      );
    }
    setMicrophonePermissionStatus(permission);
  };

  useEffect(() => {
    requestCameraPermission();
    requestMicrophonePermission();
  }, []);

  const selectFile = () => {
    const options = {
      mediaType: 'video',
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, result => {
      if (result.didCancel) {
        console.log('User Canceled Image Picker');
        alert('You did not select a Video');
      }
      if (result.errorMessage) {
        console.log(
          'Error Message: ' + result.errorMessage + ' ' + result.errorCode,
          alert(
            'There seems to be an error uploading your video, please try again.',
          ),
        );
      }
      if (result.assets[0]) {
        setResourcePath(result.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Create Post</AppText>
      <View style={{marginVertical: 20}}>
        {/* <Image
          source={{uri: resourcePath.uri}}
          style={{width: 300, height: 400}}
        /> */}
        <Video
          source={{uri: resourcePath.uri}} // Can be a URL or a local file.
          onBuffer={() => console.log('..Buffering')} // Callback when remote video is buffering
          onError={error =>
            console.log(
              'There seems to be an error: ' + error.error.errorString,
            )
          } // Callback when video cannot be loaded
          style={{width: 300, height: 400}}
          repeat={true}
          muted={true}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <AppText style={{alignItems: 'center', color: '#fff', fontSize: 12}}>
          {resourcePath.uri}
        </AppText>
      </View>
      <TouchableOpacity onPress={selectFile} style={styles.button}>
        <AppText style={styles.buttonText}>Open Device Library</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NAVIGATION_PARAM.createNavigator.camera)
        }
        style={styles.button}>
        <AppText style={styles.buttonText}>Open Live Recording Feature</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          VESDK.openEditor(
            require('../../assets/FeedData/FeedVideos/Kayak2.mp4'),
          )
        }
        style={styles.button}>
        <AppText style={styles.buttonText}>Open Post Editing Feature</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  text: {
    color: colors.white,
  },
  welcome: {
    fontSize: 38,
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
  },
  bold: {
    fontWeight: '500',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

export default CreatePostScreen;
