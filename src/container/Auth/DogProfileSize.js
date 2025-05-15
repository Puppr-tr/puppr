import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {DogSizeData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileSize({navigation, route}) {
  const userData = route?.params;

  const [selectedSize, setSelectedSize] = useState('');
  
  const renderSizeItem = ({item}) => {
    const isSelected = selectedSize === item.value;
    
    return (
      <TouchableOpacity
        onPress={() => onPressSize(item.value)}
        style={[
          localStyle.sizeContainer,
          {borderColor: colors.selectBorder},
          isSelected && {
            backgroundColor: colors.secondary1,
            borderColor: colors.secondary1,
          },
        ]}>
        <View style={localStyle.sizeContent}>
          <FText
            type={'b20'}
            color={isSelected ? colors.white : colors.primary}>
            {item.label}
          </FText>
          <FText
            type={'m16'}
            color={isSelected ? colors.white : colors.grayScale400}
            style={localStyle.descriptionText}>
            {item.description}
          </FText>
        </View>
      </TouchableOpacity>
    );
  };
  
  const onPressSize = value => {
    setSelectedSize(value);
  };
  
  const onPressNext = () => {
    if (selectedSize === '') {
      alert(strings.pleaseSelectDogSize);
    } else {
      navigation.navigate(AuthNav.DogProfileTraining, {
        ...userData,
        dogSize: selectedSize,
      });
    }
  };
  
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectDogSize}
          </FText>
          <View style={localStyle.sizesContainer}>
            <FlatList
              data={DogSizeData}
              renderItem={renderSizeItem}
              keyExtractor={item => item.id.toString()}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <StepIndicator step={7} rightIcon onPressNext={onPressNext} totalSteps={9} />
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
  sizesContainer: {
    ...styles.mt20,
  },
  sizeContainer: {
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(12),
    ...styles.mb15,
    ...styles.p15,
    width: '100%',
  },
  sizeContent: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.alignCenter,
  },
  descriptionText: {
    ...styles.ml10,
  },
  bottomContainer: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.alignCenter,
  },
  stepText: {
    ...styles.mr10,
  },
}); 