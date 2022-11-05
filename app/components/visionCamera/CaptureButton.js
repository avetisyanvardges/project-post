import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Reanimated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

const _CaptureButton = ({
  onMediaCaptured,
  flash,
  enabled,
  style,
  isRecord = false,
  stopRecordingFunction,
  startRecordingFunction,
  captureButtonSize,
  ...props
}) => {
  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);

  const onStoppedRecording = useCallback(() => {
    isRecording.current = false;
    cancelAnimation(recordingProgress);
  }, [recordingProgress]);
  const stopRecording = useCallback(async () => {
    try {
      await stopRecordingFunction();
    } catch (e) {
      console.error('failed to stop recording!', e);
    }
  }, [stopRecordingFunction]);
  const startRecording = useCallback(() => {
    try {
      console.log('calling startRecording()...');
      startRecordingFunction({
        flash: flash,
        onRecordingError: error => {
          console.error('Recording failed!', error);
          onStoppedRecording();
        },
        onRecordingFinished: video => {
          console.log(`Recording successfully finished! ${video.path}`);
          onMediaCaptured(video, 'video');
          onStoppedRecording();
        },
        fileType: 'mp4',
        videoCodec: 'h264',
      });
      // TODO: wait until startRecording returns to actually find out if the recording has successfully started
      console.log('called startRecording()!');
      isRecording.current = true;
    } catch (e) {
      console.error('failed to start recording!', e, 'camera');
    }
  }, [flash, onMediaCaptured, onStoppedRecording, startRecordingFunction]);
  //#endregion

  //#region Tap handler
  const onPressButton = useCallback(async () => {
    if (!isRecord) {
      startRecording();
    } else {
      await stopRecording();
    }
  }, [isRecord, startRecording, stopRecording]);

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isRecord ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [isRecord],
  );
  const buttonStyle = useAnimatedStyle(() => {
    let scale;
    if (enabled) {
      if (isRecord) {
        scale = withRepeat(
          withSpring(1, {
            stiffness: 100,
            damping: 1000,
          }),
          -1,
          true,
        );
      } else {
        scale = withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }
    } else {
      scale = withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    }

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale: scale,
        },
      ],
    };
  }, [enabled, isRecord]);

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    shadow: {
      position: 'absolute',
      width: captureButtonSize,
      height: captureButtonSize,
      borderRadius: captureButtonSize / 2,
      backgroundColor: '#e72547',
    },
    button: {
      width: captureButtonSize,
      height: captureButtonSize,
      borderRadius: captureButtonSize / 2,
      borderWidth: captureButtonSize * 0.05,
      borderColor: 'white',
    },
  });

  return (
    <TouchableOpacity onPress={onPressButton} disabled={!enabled}>
      <Reanimated.View {...props} style={[buttonStyle, style]}>
        <Reanimated.View style={styles.flex}>
          <Reanimated.View style={[styles.shadow, shadowStyle]} />
          <View style={styles.button} />
        </Reanimated.View>
      </Reanimated.View>
    </TouchableOpacity>
  );
};

export const CaptureButton = React.memo(_CaptureButton);
