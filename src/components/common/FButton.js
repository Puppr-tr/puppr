import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

// custom import
import {colors, styles} from '../../themes';
import FText from './FText';
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';

export default function FButton({
  title,
  type,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  bgColor = null,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        containerStyle,
        bgColor
          ? {backgroundColor: bgColor}
          : {backgroundColor: colors.primary},
      ]}
      onPress={onPress}
      {...props}>
      <View style={localStyle.iconContainer}>{frontIcon}</View>
      <FText
        type={type ? type : 'B16'}
        align={'center'}
        style={style ? style : localStyle.textContainer}
        color={color ? color : colors.white}>
        {title}
      </FText>
      {icon}
      {children}
    </TouchableOpacity>
  );
}
const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(56),
    borderRadius: moderateScale(32),
    width: deviceWidth - moderateScale(40),
    ...styles.mv10,
    ...styles.flexRow,
    ...styles.center,
  },
  iconContainer: {
    ...styles.ml10,
  },
  textContainer: {
    ...styles.flex,
  },
});
