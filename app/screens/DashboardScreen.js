import React from 'react';
import {View} from 'react-native';
import AppText from '../components/dataDisplays/AppText';
import {colors} from '../config/theme';

function DashboardScreen(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <AppText style={{color: colors.white, fontSize: 20, fontWeight: '600'}}>
        Dashboard
      </AppText>
    </View>
  );
}

export default DashboardScreen;
