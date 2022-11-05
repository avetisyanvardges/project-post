module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
    '@react-native-community/blur': {
      platforms: {
        android: null,
      },
    },

  },
  assets: ['./app/assets/fonts/'],
};
