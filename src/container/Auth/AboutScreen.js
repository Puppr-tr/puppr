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

export default function AboutScreen({navigation, route}) {
  const {userName, mobileNo, birthDate, gender, interest} = route?.params;
  
  const [about, setAbout] = useState('');
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
    setAbout(text);
  };
  
  const onPressNext = () => {
    navigation.navigate(AuthNav.UploadPhoto, {
      userName: userName,
      mobileNo: mobileNo,
      birthDate: birthDate,
      gender: gender,
      interest: interest,
      about: about,
    });
  };
  
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.tellUsAboutYourself}
            </FText>
            <FInput
              placeholder={strings.aboutPlaceholder}
              _value={about}
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
            <StepIndicator step={5} rightIcon onPressNext={onPressNext} />
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