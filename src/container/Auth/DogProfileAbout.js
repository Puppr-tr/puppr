import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import FInput from '../../components/common/FInput';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';
import {getHeight, moderateScale} from '../../common/constants';
import {setAsyncStorageData, setAuthToken} from '../../utils/AsyncStorage';
import {USER_DATA} from '../../common/constants';
import FButton from '../../components/common/FButton';
import {StackNav} from '../../navigation/navigationKey';

export default function DogProfileAbout({navigation, route}) {
  const userData = route?.params;
  
  const [dogAbout, setDogAbout] = useState('');
  const [aboutInputStyle, setAboutInputStyle] = useState(BlurredStyle);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const BlurredStyle = {
    borderColor: colors.white,
  };
  const FocusedStyle = {
    borderColor: colors.secondary1,
  };

  const onFocusAbout = () => {
    onFocusInput(setAboutInputStyle);
  };
  const onBlurAbout = () => {
    onBlurInput(setAboutInputStyle);
  };
  
  const onChangeAbout = text => {
    setDogAbout(text);
  };
  
  const onPressComplete = async () => {
    const completedUserData = {
      ...userData,
      dogAbout: dogAbout,
    };
    await setAuthToken(true);
    await setAsyncStorageData(USER_DATA, completedUserData);
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabNavigation, userData: completedUserData}],
    });
  };
  
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.tellUsAboutYourDog}
            </FText>
            <FInput
              placeholder={strings.dogAboutPlaceholder}
              _value={dogAbout}
              keyBoardType={'default'}
              autoCapitalize={'sentences'}
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              toGetTextFieldValue={onChangeAbout}
              inputContainerStyle={[aboutInputStyle, localStyle.textAreaStyle]}
              inputBoxStyle={localStyle.inputBoxStyle}
              _onFocus={onFocusAbout}
              onBlur={onBlurAbout}
            />
          </View>
          <View>
            <StepIndicator step={9} totalSteps={9} />
            <FButton title={strings.completeProfile} onPress={onPressComplete} />
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
  textAreaStyle: {
    height: getHeight(150),
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    ...styles.mt20,
  },
  inputBoxStyle: {
    textAlignVertical: 'top',
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    height: getHeight(140),
  }
}); 