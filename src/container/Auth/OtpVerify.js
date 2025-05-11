import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import Typography from '../../themes/typography';
import FButton from '../../components/common/FButton';
import {AuthNav} from '../../navigation/navigationKey';

export default function OtpVerify({navigation, route}) {
  const [otp, setOtp] = useState('');
  const mobileNo = route?.params?.mobileNo;

  const onOtpChange = text => setOtp(text);

  const onPressResendCode = () => {
    alert('Otp Resend');
  };

  const onPressVerify = () => {
    navigation.navigate(AuthNav.AccountName, {mobileNo: mobileNo});
  };

  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.enterDigitsCode}
            </FText>
            <OTPInputView
              pinCount={4}
              style={localStyle.otpInputViewStyle}
              code={otp}
              onCodeChanged={onOtpChange}
              secureTextEntry={true}
              editable
              keyboardAppearance={'dark'}
              placeholderTextColor={colors.black}
              autoFocusOnLoad={false}
              codeInputFieldStyle={[
                localStyle.underlineStyleBase,
                {
                  backgroundColor: colors.white,
                  color: colors.black,
                  borderColor: colors.white,
                },
              ]}
              codeInputHighlightStyle={{borderColor: colors.secondary1}}
            />
            <View style={localStyle.receiveCodeContainer}>
              <FText color={colors.lightBlack} type={'R14'}>
                {strings.didReceivedTheCode}
              </FText>
              <TouchableOpacity
                style={localStyle.resendText}
                onPress={onPressResendCode}>
                <FText color={colors.secondary1} type={'S14'}>
                  {strings.resendCode}
                </FText>
              </TouchableOpacity>
            </View>
          </View>
          <FButton title={strings.verify} onPress={onPressVerify} />
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
  otpInputViewStyle: {
    ...styles.selfCenter,
    height: '20%',
    ...styles.mt30,
  },
  underlineStyleBase: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    ...Typography.fontWeights.Bold,
    ...Typography.fontSizes.f26,
  },
  receiveCodeContainer: {
    ...styles.rowCenter,
    ...styles.mt30,
  },
  resendText: {
    ...styles.ml5,
  },
});
