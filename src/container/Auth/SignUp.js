import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CountryPicker, {
  FlagButton,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import FInput from '../../components/common/FInput';
import {USER_DATA, getHeight, moderateScale} from '../../common/constants';
import FButton from '../../components/common/FButton';
import {AuthNav} from '../../navigation/navigationKey';

export default function SignUp({navigation}) {
  const [number, setNumber] = useState('');
  const [numberInputStyle, setNumberInputStyle] = useState(BlurredStyle);
  const [callingCodeLib, setCallingCodeLib] = useState('+91');
  const [visiblePiker, setVisiblePiker] = useState(false);
  const [countryCodeLib, setCountryCodeLib] = useState('IN');

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

  const onPressContinue = async () => {
    // if (number === '') {
    //   alert(strings.pleaseEnterYourMobileNumber);
    // } else {
    // }
    navigation.navigate(AuthNav.OtpVerify, {mobileNo: number});
  };
  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.enterYourNumber}
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

          <FButton
            type={'B16'}
            title={strings.continue}
            onPress={onPressContinue}
          />
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
});
