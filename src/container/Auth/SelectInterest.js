import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {SelectInterestData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function SelectInterest({navigation, route}) {
  const {userName, mobileNo, birthDate, gender} = route?.params;

  const [selectedChips, setSelectedChips] = useState([]);
  const renderChips = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChips(item)}
        key={item}
        style={[
          localStyle.chipsContainer,
          {borderColor: colors.selectBorder},
          selectedChips.includes(item) && {
            backgroundColor: colors.secondary1,
          },
        ]}>
        <FText
          type={'b18'}
          color={selectedChips.includes(item) ? colors.white : colors.primary}>
          {item}
        </FText>
      </TouchableOpacity>
    );
  };
  const onPressChips = value => {
    if (selectedChips.includes(value)) {
      setSelectedChips(selectedChips.filter(item => item !== value));
    } else {
      setSelectedChips([...selectedChips, value]);
    }
  };
  const onPressNext = () => {
    if (selectedChips.length === 5 || selectedChips.length > 5) {
      navigation.navigate(AuthNav.UploadPhoto, {
        userName: userName,
        mobileNo: mobileNo,
        birthDate: birthDate,
        gender: gender,
        interest: selectedChips,
      });
    } else {
      alert(strings.pleaseSelectAtLeastYourInterest);
    }
  };
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectUptoInterests}
          </FText>
          <View style={localStyle.chipMainContainer}>
            <FlatList
              data={SelectInterestData}
              renderItem={renderChips}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              bounces={false}
              numColumns={2}
              columnWrapperStyle={localStyle.columnWrapperStyle}
            />
          </View>
        </View>
        <StepIndicator step={4} rightIcon onPressNext={onPressNext} />
      </View>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainBgContainer: {
    ...styles.flexGrow1,
  },
  mainContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
  },
  chipsContainer: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(32),
    ...styles.mt15,
    ...styles.mh5,
  },
  chipMainContainer: {
    ...styles.wrap,
    ...styles.flexRow,
  },
  columnWrapperStyle: {
    ...styles.wrap,
  },
});
