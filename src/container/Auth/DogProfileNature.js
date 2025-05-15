import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {DogNatureData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileNature({navigation, route}) {
  const userData = route?.params;

  const [selectedNatures, setSelectedNatures] = useState([]);
  const renderChips = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChips(item)}
        key={item}
        style={[
          localStyle.chipsContainer,
          {borderColor: colors.selectBorder},
          selectedNatures.includes(item) && {
            backgroundColor: colors.secondary1,
          },
        ]}>
        <FText
          type={'b18'}
          color={selectedNatures.includes(item) ? colors.white : colors.primary}>
          {item}
        </FText>
      </TouchableOpacity>
    );
  };
  const onPressChips = value => {
    if (selectedNatures.includes(value)) {
      setSelectedNatures(selectedNatures.filter(item => item !== value));
    } else {
      setSelectedNatures([...selectedNatures, value]);
    }
  };
  const onPressNext = () => {
    if (selectedNatures.length === 0) {
      alert(strings.pleaseSelectAtLeastOneDogNature);
    } else {
      navigation.navigate(AuthNav.DogProfileBehavior, {
        ...userData,
        dogNature: selectedNatures,
      });
    }
  };
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectDogPersonality}
          </FText>
          <View style={localStyle.chipMainContainer}>
            <FlatList
              data={DogNatureData}
              renderItem={renderChips}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              bounces={false}
              numColumns={2}
              columnWrapperStyle={localStyle.columnWrapperStyle}
            />
          </View>
        </View>
        <StepIndicator step={5} rightIcon onPressNext={onPressNext} totalSteps={9} />
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
  bottomContainer: {
    ...styles.mb15,
  },
  stepText: {
    ...styles.mb5,
  }
}); 