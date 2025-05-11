import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FText from './FText';
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';

const FHeader = props => {
  const {
    title,
    onPressBack,
    rightIcon,
    isHideBack,
    isLeftIcon,
    color,
    textColor,
  } = props;

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <View style={[localStyle.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity
            style={localStyle.iconBg}
            onPress={onPressBack || goBack}>
            <Ionicons
              name={'chevron-back-outline'}
              size={moderateScale(22)}
              color={colors ? color : colors.black}
            />
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}

        <FText
          numberOfLines={1}
          style={[styles.flex, styles.mr20]}
          align={'center'}
          color={textColor ? textColor : colors.black}
          type={'B24'}>
          {title}
        </FText>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default memo(FHeader);

const localStyle = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
    ...styles.mt10,
  },
  iconBg: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
    ...styles.center,
  },
});
