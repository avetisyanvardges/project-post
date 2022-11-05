import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated from 'react-native-reanimated';
import Icon from '../../../components/svgIcons/Icon';
import useContainer from './hook';

export function CameraPage() {
  const {
    styles,
    device,
    onPinchGesture,
    isActive,
    onDoubleTap,
    ReanimatedCamera,
    supportsCameraFlipping,
    onFlipCameraPressed,
    supportsFlash,
    onFlashPressed,
    flash,
    supports60Fps,
    supportsHdr,
    is60Fps,
    setIs60Fps,
    enableHdr,
    setEnableHdr,
    enableNightMode,
    format,
    fps,
    onInitialized,
    onError,
    cameraAnimatedProps,
  } = useContainer();

  if (device == null) {
    return <Text>Loading</Text>;
  } else {
    return (
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
          <Reanimated.View style={StyleSheet.absoluteFill}>
            <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
              <ReanimatedCamera
                style={StyleSheet.absoluteFill}
                isActive={true}
                lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                device={device}
                format={format}
                fps={fps}
                hdr={enableHdr}
                onInitialized={onInitialized}
                onError={onError}
                enableZoomGesture={false}
                animatedProps={cameraAnimatedProps}
              />
            </TapGestureHandler>
          </Reanimated.View>
        </PinchGestureHandler>
        <View style={styles.actionSheetContainer}>
          {supportsCameraFlipping && (
            <TouchableOpacity
              style={styles.button}
              onPress={onFlipCameraPressed}
              disabledOpacity={0.4}>
              <Icon name="camera-reverse" color="white" size={24} />
            </TouchableOpacity>
          )}
          {supportsFlash && (
            <TouchableOpacity
              style={styles.button}
              onPress={onFlashPressed}
              disabledOpacity={0.4}>
              <Icon
                name={flash === 'on' ? 'flash' : 'flash-off'}
                color="white"
                size={24}
              />
            </TouchableOpacity>
          )}
          {supports60Fps && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIs60Fps(!is60Fps)}>
              <Text style={styles.text}>
                {is60Fps ? '60' : '30'}
                {'\n'}FPS
              </Text>
            </TouchableOpacity>
          )}
          {supportsHdr && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEnableHdr(h => !h)}>
              <Icon
                name={enableHdr ? 'hdr' : 'hdr-off'}
                color="white"
                size={24}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
