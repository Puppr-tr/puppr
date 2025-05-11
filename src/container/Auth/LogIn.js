import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CountryPicker, {
  FlagButton,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import FInput from '../../components/common/FInput';
import FButton from '../../components/common/FButton';
import {USER_DATA, getHeight, moderateScale} from '../../common/constants';
import {AppleIcon, GoogleIcon} from '../../assets/svg';
import strings from '../../i18n/strings';
import {AuthNav} from '../../navigation/navigationKey';
import {getAsyncStorageData} from '../../utils/AsyncStorage';

export default function LogIn({navigation}) {
  const [number, setNumber] = useState('');
  const [numberInputStyle, setNumberInputStyle] = useState(BlurredStyle);
  const [callingCodeLib, setCallingCodeLib] = useState('+91');
  const [visiblePiker, setVisiblePiker] = useState(false);
  const [countryCodeLib, setCountryCodeLib] = useState('IN');
  const [data, setData] = useState('');

  const openCountryPicker = () => setVisiblePiker(true);
  const closeCountryPicker = () => setVisiblePiker(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onSelectCountry = country => {
    setCountryCodeLib(country.cca2);
    setCallingCodeLib('+' + country.callingCode[1]);
    closeCountryPicker();
  };

  const BlurredStyle = {
    borderColor: colors.white,
  };
  const FocusedStyle = {
    borderColor: colors.secondary1,
  };

  const onFocusNumber = () => {
    onFocusInput(setNumberInputStyle);
  };
  const onBlurNumber = () => {
    onBlurInput(setNumberInputStyle);
  };

  const onChangedPhoneNo = text => setNumber(text);
  const userDetails = async () => {
    const data = await getAsyncStorageData(USER_DATA);
    setData(data);
  };

  useEffect(() => {
    userDetails();
  }, []);

  const LeftIcon = () => {
    return (
      <TouchableOpacity
        onPress={openCountryPicker}
        style={localStyle.countryPickerStyle}>
        <FlagButton
          value={callingCodeLib}
          onOpen={openCountryPicker}
          withEmoji={true}
          countryCode={countryCodeLib}
          withCallingCodeButton={true}
          containerButtonStyle={localStyle.countryPickerButton}
        />
        <Ionicon
          name={'chevron-down'}
          size={moderateScale(16)}
          color={colors.grayScale400}
        />
        <View style={localStyle.lineView} />
      </TouchableOpacity>
    );
  };

  const onPressLogIn = async () => {
    // if (number === '') {
    //   alert(strings.pleaseEnterYourMobileNumber);
    // } else {
    // }
    navigation.navigate(AuthNav.VerifyLoginOtp, {number: number});
  };

  const onPressSignUp = () => {
    navigation.navigate(AuthNav.SignUp);
  };

  const SocialBtn = ({title, frontIcon, onPress = () => {}}) => {
    return (
      <TouchableOpacity style={localStyle.btnContainer} onPress={onPress}>
        {frontIcon}
        <FText style={localStyle.titleText} type={'B16'} color={colors.primary}>
          {title}
        </FText>
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.login}
            </FText>
            <FText type={'R16'} color={colors.primary} align={'center'}>
              {strings.enterYourPhoneNumberToLogin}
            </FText>
            <FInput
              placeholder={strings.mobileNumber}
              _value={number}
              keyBoardType={'number-pad'}
              autoCapitalize={'none'}
              maxLength={10}
              toGetTextFieldValue={onChangedPhoneNo}
              inputContainerStyle={numberInputStyle}
              _onFocus={onFocusNumber}
              onBlur={onBlurNumber}
              insideLeftIcon={() => <LeftIcon />}
            />
            <CountryPicker
              countryCode={'IN'}
              withFilter={true}
              visible={visiblePiker}
              withFlag={true}
              withFlagButton={true}
              withCallingCode={true}
              withAlphaFilter={true}
              onSelect={country => onSelectCountry(country)}
              withCountryNameButton={true}
              onClose={closeCountryPicker}
              renderFlagButton={() => {
                return null;
              }}
              theme={colors.dark ? DARK_THEME : DEFAULT_THEME}
            />
          </View>
          <View>
            <FButton
              type={'B16'}
              title={strings.login}
              onPress={onPressLogIn}
            />
            <SocialBtn
              title={strings.loginWithGoogle}
              frontIcon={<GoogleIcon />}
            />
            <SocialBtn
              title={strings.loginWithApple}
              frontIcon={<AppleIcon />}
            />
            <View style={localStyle.bottomTextContainer}>
              <FText type={'M14'} color={colors.backBorder}>
                {strings.donHaveAnAccount}
              </FText>
              <TouchableOpacity onPress={onPressSignUp}>
                <FText type={'M14'} color={colors.secondary1}>
                  {strings.signUp}
                </FText>
              </TouchableOpacity>
            </View>
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
  lineView: {
    width: moderateScale(1),
    height: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
    ...styles.ml5,
  },
  countryPickerStyle: {
    ...styles.rowSpaceBetween,
    height: getHeight(52),
    width: moderateScale(89),
    ...styles.mr25,
  },
  countryPickerButton: {
    ...styles.ml5,
  },
  btnContainer: {
    ...styles.mt15,
    ...styles.p15,
    width: '100%',
    borderRadius: moderateScale(32),
    ...styles.rowCenter,
    backgroundColor: colors.white,
  },
  titleText: {
    ...styles.ml15,
  },
  bottomTextContainer: {
    ...styles.rowCenter,
    ...styles.selfCenter,
    ...styles.mv20,
  },
});
