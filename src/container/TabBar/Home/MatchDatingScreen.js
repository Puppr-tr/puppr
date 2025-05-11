import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from 'react-native-vector-icons/Feather';

// custom import
import {colors, styles} from '../../../themes';
import FHeader from '../../../components/common/FHeader';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import FButton from '../../../components/common/FButton';
import {SwipeCardIcon} from '../../../assets/svg';
import {
  USER_DATA,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import images from '../../../assets/images';
import {getAsyncStorageData} from '../../../utils/AsyncStorage';
import {useIsFocused} from '@react-navigation/native';

export default function MatchDatingScreen({navigation, route}) {
  const item = route?.params?.item;
  const [userImage, setUserImage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && userDetails();
  }, [isFocused]);

  const userDetails = async () => {
    const data = await getAsyncStorageData(USER_DATA);
    setUserImage(data?.userImage);
    console.log('userImage=========', data?.userImage);
  };

  const LeftIcon = () => {
    return (
      <Icons
        name={'message-circle'}
        size={moderateScale(24)}
        color={colors.white}
        style={localStyle.iconRoot}
      />
    );
  };

  const onPressSkipSwiping = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={localStyle.mainView}>
      <ImageBackground source={images?.MatchDatingBg} style={styles.flex}>
        <FHeader />
        <View style={localStyle.root}>
          <View>
            <FText
              type={'B24'}
              align={'center'}
              color={colors.primary}
              style={localStyle.headerText}>
              {strings.youAndAlfredoLikedEachOther}
            </FText>
          </View>
          <View style={localStyle.matchesImage}>
            <View style={localStyle.matchesUserOuterView}>
              <Image
                source={!!userImage ? {uri: userImage} : images.UserImage1}
                style={localStyle.matchUserImage}
              />
            </View>
            <View style={localStyle.percentMatchesRoot}>
              <View style={localStyle.innerPercentageBorder}>
                <FText color={colors.white} type={'S12'}>
                  {/* {item.matches} */}
                  {'80%'}
                </FText>
              </View>
            </View>
            <View style={localStyle.userImageOuterView}>
              <Image
                source={!!userImage ? {uri: userImage} : images.UserImage1}
                style={localStyle.userImage}
              />
            </View>
          </View>
          <View>
            <FButton
              title={strings.sendMessage}
              frontIcon={<LeftIcon />}
              style={styles.flex0}
            />
            <FButton
              title={strings.keepSwiping}
              frontIcon={<SwipeCardIcon style={localStyle.iconRoot} />}
              style={styles.flex0}
              bgColor={colors.white}
              color={colors.secondary1}
              onPress={onPressSkipSwiping}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainView: {
    ...styles.flex,
    backgroundColor: colors.lightPinkBg,
  },
  root: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
  },
  headerText: {
    ...styles.mt20,
  },
  iconRoot: {
    ...styles.mr10,
  },
  userImage: {
    borderTopRightRadius: moderateScale(90),
    borderTopLeftRadius: moderateScale(90),
    borderBottomRightRadius: moderateScale(90),
    height: getHeight(180),
    width: getWidth(150),
  },
  userImageOuterView: {
    borderTopRightRadius: moderateScale(90),
    borderTopLeftRadius: moderateScale(90),
    borderBottomRightRadius: moderateScale(90),
    height: getHeight(190),
    width: getWidth(160),
    ...styles.center,
    backgroundColor: colors.white,
    ...styles.mh5,
  },
  matchesImage: {
    ...styles.rowCenter,
  },
  percentMatchesRoot: {
    height: moderateScale(56),
    width: moderateScale(56),
    position: 'absolute',
    zIndex: moderateScale(99),
    borderRadius: moderateScale(56 / 2),
    backgroundColor: colors.primary,
    ...styles.center,
  },
  innerPercentageBorder: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40 / 2),
    borderWidth: moderateScale(4),
    borderColor: colors.secondary1,
    ...styles.center,
  },
  matchUserImage: {
    borderTopRightRadius: moderateScale(90),
    borderTopLeftRadius: moderateScale(90),
    borderBottomLeftRadius: moderateScale(90),
    height: getHeight(180),
    width: getWidth(150),
  },
  matchesUserOuterView: {
    borderTopRightRadius: moderateScale(90),
    borderTopLeftRadius: moderateScale(90),
    borderBottomLeftRadius: moderateScale(90),
    height: getHeight(190),
    width: getWidth(160),
    ...styles.center,
    backgroundColor: colors.white,
    ...styles.mh5,
  },
});
