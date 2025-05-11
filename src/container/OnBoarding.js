import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

// custom import
import FText from '../components/common/FText';
import FSafeAreaView from '../components/common/FSafeAreaView';
import {colors, styles} from '../themes';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../common/constants';
import {OnBoardingData} from '../api/constant';
import FButton from '../components/common/FButton';
import strings from '../i18n/strings';
import {CallIcon, GoogleIcon} from '../assets/svg';
import {AuthNav} from '../navigation/navigationKey';
import {setOnBoarding} from '../utils/AsyncStorage';

export default function OnBoarding({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);

  const _viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const CallILeftIcon = () => {
    return (
      <View style={localStyle.iconBg}>
        <CallIcon />
      </View>
    );
  };

  const GoogleLeftIcon = () => {
    return (
      <View style={localStyle.iconBg}>
        <GoogleIcon />
      </View>
    );
  };

  const RenderItemData = useCallback(
    ({item, index}) => {
      return (
        <View style={localStyle.Container}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={[localStyle.ImageStyle]}
          />
          <View style={localStyle.boardingTextContainer}>
            <FText
              type={'B28'}
              align={'center'}
              style={localStyle.boardingTitleText}>
              {item.title}
            </FText>
            <FText
              type={'R16'}
              align={'center'}
              numberOfLines={2}
              color={colors.backBorder}
              style={localStyle.boardingDescriptionText}>
              {item.description}
            </FText>
          </View>
        </View>
      );
    },
    [OnBoardingData],
  );

  const OnPressContinue = async () => {
    if (currentIndex === 2) {
      if (strings.loginWithPhone) {
        await setOnBoarding(true);
        navigation.reset({
          index: 0,
          routes: [{name: AuthNav.LogIn}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: AuthNav.SignIn}],
        });
      }
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: deviceWidth * (currentIndex + 1),
      });
    }
  };
  const onPressSignIn = async () => {
    await setOnBoarding(true);
    navigation.reset({
      index: 0,
      routes: [{name: AuthNav.LogIn}],
    });
  };

  return (
    <FSafeAreaView>
      <FlatList
        data={OnBoardingData}
        ref={slideRef}
        renderItem={({item, index}) => (
          <RenderItemData item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        pagingEnabled
      />
      <View style={styles.selfCenter}>
        <FButton
          onPress={OnPressContinue}
          title={currentIndex === 2 ? strings.loginWithPhone : strings.continue}
          frontIcon={currentIndex === 2 ? <CallILeftIcon /> : null}
        />
        <FButton
          onPress={currentIndex === 2 ? null : onPressSignIn}
          title={currentIndex === 2 ? strings.loginWithGoogle : strings.signIn}
          frontIcon={currentIndex === 2 ? <GoogleLeftIcon /> : null}
          bgColor={colors.btnBg}
          color={colors.primary}
        />
      </View>

      {currentIndex === 2 ? (
        <View style={localStyle.bottomTextContainer}>
          <FText type={'M14'} color={colors.backBorder}>
            {strings.donHaveAnAccount}
          </FText>
          <TouchableOpacity onPress={onPressSignIn}>
            <FText type={'M14'} color={colors.secondary1}>
              {strings.signUp}
            </FText>
          </TouchableOpacity>
        </View>
      ) : null}
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  Container: {
    width: deviceWidth,
    ...styles.itemsCenter,
    ...styles.justifyBetween,
  },
  boardingTextContainer: {
    width: '86%',
    gap: moderateScale(10),
    ...styles.mb20,
  },
  boardingTitleText: {
    ...styles.mt10,
  },
  ImageStyle: {
    top: moderateScale(60),
    ...styles.selfCenter,
    height: getHeight(350),
    width: getWidth(350),
    ...styles.ml15,
  },
  iconBg: {
    height: getHeight(40),
    width: getWidth(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.white,
    ...styles.center,
  },
  bottomTextContainer: {
    ...styles.rowCenter,
    ...styles.selfCenter,
    ...styles.mb20,
  },
});
