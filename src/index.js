import {View} from 'react-native';
import React from 'react';
import AppNavigator from './navigation';
import {styles} from './themes';

const App = () => {
  return (
    <View style={styles.flex}>
      <AppNavigator />
    </View>
  );
};

export default App;
