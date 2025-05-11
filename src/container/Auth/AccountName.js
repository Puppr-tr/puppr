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
import {setAsyncStorageData} from '../../utils/AsyncStorage';
import {USER_DATA} from '../../common/constants';

export default function AccountName({navigation, route}) {
  const mobileNo = route?.params?.mobileNo;
  const [name, setName] = useState('');
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
    setName(text);
    setNameError(msg);
    return false;
  };
  const onPressNext = () => {
    // if (name === '') {
    //   alert(strings.pleaseEnterYourName);
    // } else {
    // }
    navigation.navigate(AuthNav.EnterBirthDate, {
      userName: name,
      mobileNo: mobileNo,
    });
  };
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.whatYourName}
            </FText>
            <FInput
              placeholder={strings.fullName}
              _value={name}
              keyBoardType={'default'}
              _errorText={nameError}
              maxLength={30}
              autoCapitalize={'none'}
              toGetTextFieldValue={onChangeName}
              inputContainerStyle={nameInputStyle}
              _onFocus={onFocusName}
              onBlur={onBlurName}
            />
          </View>
          <View>
            <StepIndicator step={1} rightIcon onPressNext={onPressNext} />
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
