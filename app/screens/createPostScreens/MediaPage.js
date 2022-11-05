import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused} from '@react-navigation/core';
import CameraRoll from '@react-native-community/cameraroll';
import {
  VESDK,
  VideoEditorModal,
  Configuration,
} from 'react-native-videoeditorsdk';
import {PressableOpacity} from 'react-native-pressable-opacity';
import {ColorSpace} from 'react-native-reanimated';
//Internal Components
import Icon from '../../components/svgIcons/Icon';
import AppText from '../../components/dataDisplays/AppText';
import {useIsForeground} from '../../components/visionCamera/hooks/useIsForeground';
import {StatusBarBlurBackground} from '../../components/visionCamera/views/StatusBarBlurBackground';
import {joinAllVideos} from '../../components/visionCamera/VideoFormater';
//configurations and constants
import {CAMERA_CONSTANTS} from '../../config/constants';
import {colors} from '../../config/theme';

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

const isVideoOnLoadEvent = event =>
  'duration' in event && 'naturalSize' in event;

export function MediaPage({navigation, route}) {
  const {path, type} = route.params;
  const isForeground = useIsForeground();
  const isScreenFocused = useIsFocused();
  const isVideoPaused = !isForeground || !isScreenFocused;
  const [savingState, setSavingState] = useState('none');
  const [currentVideoURL, setCurrentVideoURL] = useState('');
  const video = useRef();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [listVideos, setListVideos] = useState([]);
  const currentIndex = useRef(0);

  const onMediaLoad = useCallback(event => {
    if (isVideoOnLoadEvent(event)) {
      console.log(
        `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
      );
    } else {
      console.log(
        `Image loaded. Size: ${event.nativeEvent.source.width}x${event.nativeEvent.source.height}`,
      );
    }
  }, []);
  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
  }, []);
  const onMediaLoadError = useCallback(error => {
    console.log(`failed to load media: ${JSON.stringify(error)}`);
  }, []);

  const onSavePressed = useCallback(async () => {
    try {
      if (type === 'photo' || type == 'video') {
        setSavingState('saving');
        const hasPermission = await requestSavePermission();
        if (!hasPermission) {
          Alert.alert(
            'Permission denied!',
            'Vision Camera does not have permission to save the media to your camera roll.',
          );
          return;
        }
        if (path.length == 1) {
          await CameraRoll.save(`file://${path[0].path}`, {
            type: type,
          });
        } else {
          await CameraRoll.save(`file://${video.current}`, {
            type: type,
          });
        }
        setSavingState('saved');
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert(
        'Failed to save!',
        `An unexpected error occured while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, setSavingState, type]);

  const onPostEditing = useCallback(async () => {
    try {
      if (type === 'photo' || type == 'video') {
        if (path.length == 1) {
          VESDK.openEditor(path[0].path);
        } else {
          VESDK.openEditor(`file://${video.current}`);
        }
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      Alert.alert(
        'Failed to laod Imgly!',
        `An unexpected error occured while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, setSavingState, type]);

  const source = useMemo(() => {
    if (type === 'photo') {
      return {uri: `file://${path}`};
    } else {
      joinAllVideos(path)
        .then(url => setCurrentVideoURL(url))
        .catch(error => console.log('Error: ', error));
      return {uri: `file://${path}`};
    }
  }, [path, type]);

  video.current = currentVideoURL;

  return (
    <View style={styles.container}>
      {type === 'photo' && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}
      {/* below code used to play one concat video */}
      {type === 'video' &&
        (currentVideoURL !== '' ? (
          <View style={styles.videoContainer}>
            <Video
              key={currentVideoURL}
              source={{
                uri: currentVideoURL,
              }}
              style={{
                width: CAMERA_CONSTANTS.screenWidth,
                height: CAMERA_CONSTANTS.screenHeight,
              }}
              paused={isVideoPaused}
              resizeMode="cover"
              // posterResizeMode="cover"
              allowsExternalPlayback={true}
              automaticallyWaitsToMinimizeStalling={true}
              disableFocus={true}
              // repeat={true}
              useTextureView={false}
              playInBackground={false}
              controls={false}
              playWhenInactive={true}
              ignoreSilentSwitch="ignore"
              onReadyForDisplay={onMediaLoadEnd}
              onLoad={onMediaLoad}
              onError={onMediaLoadError}
            />
          </View>
        ) : (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ))}
      <PressableOpacity
        style={styles.closeButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon size={25} fill={colors.white} name="chevron-left" />
      </PressableOpacity>

      <PressableOpacity
        style={styles.saveButton}
        onPress={onSavePressed}
        disabled={savingState !== 'none'}>
        {savingState === 'none' && (
          <Icon name="download" size={25} fill={colors.white} />
        )}
        {savingState === 'saved' && (
          <Icon name="checkmark" size={25} fill={colors.white} />
        )}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>

      <PressableOpacity style={styles.tagContainer} onPress={onPostEditing}>
        <AppText style={styles.tag}>Next{'  '}</AppText>
        <Icon name="chevron-right" size={14} fill={'white'} />
      </PressableOpacity>

      <StatusBarBlurBackground />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: CAMERA_CONSTANTS.screenWidth,
    height: CAMERA_CONSTANTS.screenHeight,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: CAMERA_CONSTANTS.safeAreaPadding.paddingTop,
    left: CAMERA_CONSTANTS.safeAreaPadding.paddingLeft,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: CAMERA_CONSTANTS.safeAreaPadding.paddingBottom,
    left: CAMERA_CONSTANTS.safeAreaPadding.paddingLeft,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
  activity: {
    position: 'absolute',
    width: CAMERA_CONSTANTS.screenWidth,
    height: CAMERA_CONSTANTS.screenHeight,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagContainer: {
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: colors.darkCharcoal,
    bottom: CAMERA_CONSTANTS.safeAreaPadding.paddingBottom,
    right: CAMERA_CONSTANTS.safeAreaPadding.paddingLeft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tag: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 5,
  },
});
