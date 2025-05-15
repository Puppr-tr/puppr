import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {DogTrainingData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileTraining({navigation, route}) {
  const userData = route?.params;
  const [selectedTraining, setSelectedTraining] = useState('');

  const renderTrainingItem = ({item}) => {
    const isSelected = selectedTraining === item.value;
    
    return (
      <TouchableOpacity
        onPress={() => onPressTraining(item.value)}
        style={[
          localStyle.trainingContainer,
          {borderColor: colors.selectBorder},
          isSelected && {
            backgroundColor: colors.secondary1,
            borderColor: colors.secondary1,
          },
        ]}>
        <View style={localStyle.trainingContent}>
          <FText
            type={'b20'}
            color={isSelected ? colors.white : colors.primary}>
            {item.label}
          </FText>
        </View>
      </TouchableOpacity>
    );
  };
  
  const onPressTraining = value => {
    setSelectedTraining(value);
  };

  const onPressNext = () => {
    if (selectedTraining === '') {
      alert(strings.pleaseSelectDogTraining);
    } else {
      navigation.navigate(AuthNav.DogProfileAbout, {
        ...userData,
        dogTraining: selectedTraining,
      });
    }
  };

  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectDogTraining}
          </FText>
          <View style={localStyle.trainingsContainer}>
            <FlatList
              data={DogTrainingData}
              renderItem={renderTrainingItem}
              keyExtractor={item => item.id.toString()}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <StepIndicator step={8} rightIcon onPressNext={onPressNext} totalSteps={9} />
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
  trainingsContainer: {
    ...styles.mt20,
  },
  trainingContainer: {
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(12),
    ...styles.mb15,
    ...styles.p15,
    width: '100%',
  },
  trainingContent: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.alignCenter,
  }
}); 