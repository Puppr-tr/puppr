import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom Imports
import {colors, styles} from '../../themes';
import {deviceWidth, moderateScale} from '../../common/constants';
import FText from '../common/FText';

export default function StepIndicator({step, style, rightIcon, onPressNext}) {
  const renderItem = ({item}) => {
    return (
      <View
        style={[
          localStyle.HeaderStyle,
          {
            backgroundColor:
              item <= step ? colors.secondary1 : colors.stepColor,
          },
        ]}
      />
    );
  };
  return (
    <SafeAreaView style={[localStyle.viewStyle, style]}>
      <View style={localStyle.iconAndStepContainer}>
        <FText type={'B20'} color={colors.primary} style={styles.selfEnd}>
          {step}
          <FText type={'B20'} color={colors.stepColor}>
            {'/5'}
          </FText>
        </FText>
        {rightIcon ? (
          <TouchableOpacity
            style={localStyle.iconContainer}
            activeOpacity={0.5}
            onPress={onPressNext}>
            <Ionicons
              name={'arrow-forward-outline'}
              size={moderateScale(24)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
}
const localStyle = StyleSheet.create({
  viewStyle: {
    width: deviceWidth - moderateScale(40),
    ...styles.mb30,
  },
  HeaderStyle: {
    width: moderateScale(70),
    height: moderateScale(4),
    ...styles.mt10,
  },
  iconAndStepContainer: {
    ...styles.rowSpaceBetween,
  },
  iconContainer: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    backgroundColor: colors.primary,
    ...styles.center,
  },
});
