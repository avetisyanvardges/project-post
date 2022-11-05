import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import {Camera} from 'loop-vision-camera';
import {CAMERA_CONSTANTS} from '../../config/constants';

export function PermissionsPage({navigation}) {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setMicrophonePermissionStatus(permission);
  }, [setMicrophonePermissionStatus]);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, [setCameraPermissionStatus]);

  useEffect(() => {
    if (
      cameraPermissionStatus === 'authorized' &&
      microphonePermissionStatus === 'authorized'
    ) {
      navigation.replace('CameraPage');
    }
  }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs{' '}
            <Text style={styles.bold}>Camera permission</Text>.
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
        {microphonePermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs{' '}
            <Text style={styles.bold}>Microphone permission</Text>.
            <Text
              style={styles.hyperlink}
              onPress={requestMicrophonePermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...CAMERA_CONSTANTS.safeAreaPadding,
  },
  permissionsContainer: {
    marginTop: CAMERA_CONSTANTS.contentSpacing,
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
});
