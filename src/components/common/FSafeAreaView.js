import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors, styles} from '../../themes';

export default FSafeAreaView = ({children, ...props}) => {
  return (
    <SafeAreaView {...props} style={[localStyle(colors, props.style).root]}>
      {children}
    </SafeAreaView>
  );
};

const localStyle = (colors, style) =>
  StyleSheet.create({
    root: {
      ...styles.flex,
      backgroundColor: colors.pinkBg,
      ...style,
    },
  });
