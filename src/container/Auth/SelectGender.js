import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import {getHeight, getWidth, moderateScale} from '../../common/constants';
import FText from '../../components/common/FText';
import {SelectGenderData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';
import strings from '../../i18n/strings';

export default function SelectGender({navigation, route}) {
  const {userName, mobileNo, birthDate} = route?.params;
  const [select, setSelect] = useState('');

  const onPressItem = item => {
    setSelect(item.title);
  };
  const onPressNext = () => {
    if (select === '') {
      alert(strings.pleaseSelectYourGender);
    } else {
      navigation.navigate(AuthNav.SelectInterest, {
        userName: userName,
        mobileNo: mobileNo,
        birthDate: birthDate,
        gender: select,
      });
    }
  };
  const selectGender = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[
          localStyle.genderContainer,
          {
            borderColor:
              select === item.title ? colors.secondary1 : colors.white,
          },
        ]}>
        {select === item.title ? (
          <Ionicons
            name={'checkmark-circle'}
            color={colors.secondary1}
            size={moderateScale(20)}
            style={localStyle.checkMarkIcon}
          />
        ) : null}

        <View
          style={[
            localStyle.iconBg,
            {
              backgroundColor:
                select === item.title ? colors.secondary1 : colors.primary,
            },
          ]}>
          <Ionicons
            name={item.iconName}
            size={moderateScale(32)}
            color={colors.white}
          />
        </View>
        <FText type={'M16'} color={colors.primary} style={localStyle.titleText}>
          {item.title}
        </FText>
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.whatIsYourGender}
          </FText>
          <FlatList
            data={SelectGenderData}
            renderItem={selectGender}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </View>
        <View>
          <StepIndicator step={3} rightIcon onPressNext={onPressNext} />
        </View>
      </View>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  genderContainer: {
    height: getHeight(150),
    width: getWidth(160),
    borderWidth: moderateScale(1),
    ...styles.mr10,
    ...styles.p20,
    ...styles.center,
    borderRadius: moderateScale(24),
    backgroundColor: colors.white,
    ...styles.mt20,
  },
  iconBg: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    ...styles.center,
  },
  mainContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
  },
  titleText: {
    ...styles.mt20,
  },
  checkMarkIcon: {
    ...styles.selfEnd,
  },
});
