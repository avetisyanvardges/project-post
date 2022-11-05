import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Camera} from 'loop-vision-camera';
import {PermissionsPage} from '../../screens/createPostScreens/PermissionsPage';
import {CameraPage} from '../../screens/createPostScreens/CameraPage';
import {MediaPage} from '../../screens/createPostScreens/MediaPage';
import CreatePostScreen from '../../screens/createPostScreens/CreatePostScreen';
import {NAVIGATION_PARAM} from '../../config/routes';

const Stack = createStackNavigator();

const CreatePostNavigator = () => {
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage =
    cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
        animationTypeForReplace: 'push',
      }}
      initialRouteName={
        showPermissionsPage ? 'PermissionsPage' : 'CreatPostScreen'
      }>
      <Stack.Screen
        name={NAVIGATION_PARAM.createNavigator.create}
        component={CreatePostScreen}
      />
      <Stack.Screen
        name={NAVIGATION_PARAM.createNavigator.permission}
        component={PermissionsPage}
      />
      <Stack.Screen
        name={NAVIGATION_PARAM.createNavigator.camera}
        component={CameraPage}
      />
      <Stack.Screen
        name={NAVIGATION_PARAM.createNavigator.media}
        component={MediaPage}
        options={{
          animation: 'none',
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;
