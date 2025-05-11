import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';

// custom import
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import Typography from '../../themes/typography';
import {StackNav} from '../../navigation/navigationKey';
import FSafeAreaView from '../../components/common/FSafeAreaView';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import FHeader from '../../components/common/FHeader';
import FText from '../../components/common/FText';
import FButton from '../../components/common/FButton';
import strings from '../../i18n/strings';
import {setAuthToken} from '../../utils/AsyncStorage';

export default function VerifyLoginOtp({navigation, route}) {
  const {number} = route.params || {number: ''};

  const [otp, setOtp] = useState('');
  const [counterId, setCounterId] = useState('1');
  const [isTimeOver, setIsTimeOver] = useState(false);

  const onOtpChange = text => setOtp(text);
  const onPressResend = () => {
    setCounterId(counterId + '1');
    setOtp('');
  };
  const onFinishTimer = () => {
    if (!isTimeOver) {
      setIsTimeOver(true);
    }
  };

  const onPressVerify = async () => {
    await setAuthToken(true);
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabNavigation}],
    });
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <FSafeAreaView>
      <FHeader goBack={onPressBack} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.verifyLogin}
            </FText>
            <FText type={'R14'} color={colors.lightBlack} align={'center'}>
              {strings.enterOTPCodeWeSentTo + ' ' + number}
            </FText>
            <View style={localStyle.countdownText}>
              <FText type={'R14'} color={colors.lightBlack} align={'center'}>
                {strings.thisCodeWillExpiredIn}
              </FText>
              <CountDown
                id={counterId}
                until={59}
                onFinish={onFinishTimer}
                digitStyle={{backgroundColor: colors.pinkBg}}
                digitTxtStyle={localStyle.digitStyle}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
            </View>
            <OTPInputView
              pinCount={4}
              code={otp}
              onCodeChanged={onOtpChange}
              autoFocusOnLoad={false}
              codeInputFieldStyle={[
                localStyle.underlineStyleBase,
                {
                  backgroundColor: colors.white,
                  color: colors.black,
                  borderColor: colors.white,
                },
              ]}
              codeInputHighlightStyle={{
                borderColor: colors.secondary1,
              }}
              style={localStyle.otpInputViewStyle}
              secureTextEntry={true}
            />
            <View style={localStyle.receiveCodeContainer}>
              <FText color={colors.lightBlack} type={'R14'}>
                {strings.didReceivedTheCode}
              </FText>
              <TouchableOpacity
                style={localStyle.resendText}
                onPress={onPressResend}>
                <FText color={colors.secondary1} type={'S14'}>
                  {strings.resendCode}
                </FText>
              </TouchableOpacity>
            </View>
          </View>
          <FButton title={strings.verifyCode} onPress={onPressVerify} />
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
  digitStyle: {
    fontSize: moderateScale(18),
    ...Typography.fontWeights.Regular,
    color: colors.secondary1,
  },
  countdownText: {
    ...styles.rowCenter,
  },
});
