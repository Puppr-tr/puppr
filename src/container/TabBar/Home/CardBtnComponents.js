import {Animated, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';

const CardBtnComponents = ({cardStyle, iconName, iconColor, bgColor}) => {
  return (
    <Animated.View
      style={[
        localStyle.root,
        {
          backgroundColor: bgColor,
        },
        cardStyle,
      ]}>
      <Ionicons name={iconName} size={moderateScale(28)} color={iconColor} />
    </Animated.View>
  );
};

const localStyle = StyleSheet.create({
  root: {
    position: 'absolute',
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    ...styles.center,
    top: '50%',
    left: '40%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default memo(CardBtnComponents);
