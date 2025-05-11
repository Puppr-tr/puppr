import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

// custom import
import {colors, styles} from '../themes';
import FText from '../components/common/FText';
import FSafeAreaView from '../components/common/FSafeAreaView';
import strings from '../i18n/strings';
import {USER_DATA, getHeight} from '../common/constants';
import {SplashGroupIcon} from '../assets/svg';
import images from '../assets/images';
import {
  getAsyncStorageData,
  initialStorageValueGet,
} from '../utils/AsyncStorage';
import {StackNav} from '../navigation/navigationKey';

export default function Splash({navigation}) {
  useEffect(() => {
    SplashScreen?.hide();
    asyncProcess();
  }, []);

  const asyncProcess = async () => {
    try {
      let asyncData = await initialStorageValueGet();
      let {onBoardingValue, acessTokenValue} = asyncData;
      if (!!asyncData) {
        if (!!acessTokenValue) {
          await getAsyncStorageData(USER_DATA);
          navigation.replace(StackNav.TabNavigation);
        } else if (!!onBoardingValue) {
          navigation.replace(StackNav.AuthNavigation);
        } else {
          navigation.replace(StackNav.OnBoarding);
        }
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  return (
    <FSafeAreaView style={localStyle.container}>
      <Image source={images.SplashImage} style={localStyle.splashImage} />
      <View style={localStyle.textAndIconContainer}>
        <SplashGroupIcon />
        <FText type={'B40'} color={colors.white} style={localStyle.textStyle}>
          {strings.friendzy}
        </FText>
      </View>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary1,
    ...styles.justifyCenter,
  },
  splashImage: {
    height: getHeight(600),
    width: getHeight(600),
    ...styles.ml50,
    ...styles.center,
    position: 'absolute',
  },
  textAndIconContainer: {
    ...styles.rowCenter,
  },
  textStyle: {
    ...styles.ml10,
  },
});
