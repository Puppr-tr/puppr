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

export default function StepIndicator({step, style, rightIcon, onPressNext, totalSteps = 6}) {
  const renderItem = ({item}) => {
    return (
      <View
        style={[
          localStyle.HeaderStyle,
          {
            backgroundColor:
              item <= step ? colors.secondary1 : colors.stepColor,
            width: (deviceWidth - moderateScale(50)) / totalSteps,
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
          <FText type={'B20'} color={colors.grayScale500}>
            {'/' + totalSteps}
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
        data={Array.from({length: totalSteps}, (_, i) => i + 1)}
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
    height: moderateScale(4),
    ...styles.mt10,
    marginHorizontal: 1,
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
