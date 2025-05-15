import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {validName} from '../../utils/Validation';
import FInput from '../../components/common/FInput';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileName({navigation, route}) {
  const userData = route?.params;
  
  const [dogName, setDogName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameInputStyle, setNameInputStyle] = useState(BlurredStyle);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const BlurredStyle = {
    borderColor: colors.white,
  };
  const FocusedStyle = {
    borderColor: colors.secondary1,
  };

  const onFocusName = () => {
    onFocusInput(setNameInputStyle);
  };
  const onBlurName = () => {
    onBlurInput(setNameInputStyle);
  };
  const onChangeName = text => {
    const {msg} = validName(text);
    setDogName(text);
    setNameError(msg);
    return false;
  };
  const onPressNext = () => {
    if (dogName === '') {
      alert(strings.pleaseEnterDogName);
    } else {
      navigation.navigate(AuthNav.DogProfileAge, {
        ...userData,
        dogName: dogName,
      });
    }
  };
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.whatYourDogName}
            </FText>
            <FInput
              placeholder={strings.dogName}
              _value={dogName}
              keyBoardType={'default'}
              _errorText={nameError}
              maxLength={30}
              autoCapitalize={'words'}
              toGetTextFieldValue={onChangeName}
              inputContainerStyle={nameInputStyle}
              _onFocus={onFocusName}
              onBlur={onBlurName}
            />
          </View>
          <View>
            <StepIndicator step={1} rightIcon onPressNext={onPressNext} totalSteps={9} />
          </View>
        </View>
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
  },
}); 