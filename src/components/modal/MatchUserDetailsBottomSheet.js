import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import FText from '../common/FText';
import {GenderAgeFrData, InterestData} from '../../api/constant';
import strings from '../../i18n/strings';
import {LanguageIcon, Scale_Icon} from '../../assets/svg';

export default function MatchUserDetailsBottomSheet(props) {
  let {SheetRef, item} = props;

  const MyInterest = ({item, index}) => {
    return (
      <View style={localStyle.myInterestContainer}>
        <FText type={'M16'}>{item?.title}</FText>
      </View>
    );
  };

  const GenderAgeFr = ({item, index}) => {
    return (
      <View style={localStyle.genderAgeRoot}>
        <View style={localStyle.iconBg}>
          {item?.iconName ? (
            <Ionicons
              name={item.iconName}
              color={colors.white}
              size={moderateScale(24)}
            />
          ) : (
            item?.svgIcon
          )}
        </View>
        <FText
          type={'R16'}
          color={colors.stepColor}
          align={'center'}
          style={localStyle.titleText}>
          {item.title}
        </FText>
        <FText type={'M18'} color={colors.primary} align={'center'}>
          {item.value}
        </FText>
      </View>
    );
  };
  const UserInfo = ({title, svgIcon, value}) => {
    return (
      <View>
        <View style={localStyle.userInfoRoot}>
          <View style={localStyle.iconAndTitle}>
            {svgIcon}
            <FText type={'R16'} color={colors.grayScale500} style={styles.ml10}>
              {title}
            </FText>
          </View>
          <FText type={'M16'}>{value}</FText>
        </View>
        <View style={localStyle.lineView} />
      </View>
    );
  };
  return (
    <ActionSheet ref={SheetRef}>
      <View style={localStyle.bottomSheet}>
        <View style={localStyle.rootContainer}>
          <View style={localStyle.gestureHandler} />
          <FText
            type={'R16'}
            style={localStyle.labelContainer}
            color={colors.grayScale400}>
            {strings.about}
          </FText>
          <FText type={'M16'}>{strings.aboutText}</FText>
          <FText
            type={'M16'}
            style={localStyle.labelContainer}
            color={colors.grayScale400}>
            {strings.interest}
          </FText>
          <View style={localStyle.interestRoot}>
            {InterestData.slice(0, 5).map((item, index) => {
              return <MyInterest item={item} />;
            })}
          </View>
        </View>
        <View style={localStyle.ageGenderFrRoot}>
          {GenderAgeFrData.map((item, index) => {
            return <GenderAgeFr item={item} />;
          })}
        </View>
        <View style={localStyle.rootContainer}>
          <FText type={'S18'} style={localStyle.labelContainer}>
            {item?.name + "'s info"}
          </FText>
          <UserInfo
            title={strings.height}
            svgIcon={<Scale_Icon />}
            value={'175 cm'}
          />
          <UserInfo
            title={strings.speak}
            svgIcon={<LanguageIcon />}
            value={'German, English'}
          />
          <FText
            type={'B14'}
            style={localStyle.labelContainer}
            color={colors.primary}
            align={'center'}>
            {strings.matchingText}
          </FText>
        </View>
      </View>
    </ActionSheet>
  );
}

const localStyle = StyleSheet.create({
  bottomSheet: {
    borderTopRightRadius: moderateScale(48),
    borderTopLeftRadius: moderateScale(),
    backgroundColor: colors.white,
  },
  gestureHandler: {
    height: moderateScale(6),
    width: moderateScale(60),
    backgroundColor: colors.grayScale200,
    ...styles.selfCenter,
    borderRadius: moderateScale(24),
    ...styles.mv10,
  },
  labelContainer: {
    ...styles.mv10,
  },
  myInterestContainer: {
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    ...styles.p10,
    ...styles.mv5,
    ...styles.mh5,
  },
  interestRoot: {
    ...styles.flexRow,
    ...styles.wrap,
  },
  ageGenderFrRoot: {
    width: '100%',
    height: getHeight(150),
    backgroundColor: colors.pinkBg,
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.ph20,
    ...styles.justifyBetween,
  },
  rootContainer: {
    ...styles.p10,
  },
  iconBg: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: colors.secondary1,
    ...styles.center,
  },
  genderAgeRoot: {
    ...styles.p5,
    ...styles.center,
  },
  titleText: {
    ...styles.mv10,
  },
  userInfoRoot: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  iconAndTitle: {
    ...styles.rowCenter,
  },
  lineView: {
    height: moderateScale(1),
    backgroundColor: colors.grayScale200,
    width: '100%',
  },
});
