import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import FHeader from '../../../components/common/FHeader';
import strings from '../../../i18n/strings';
import {FilterIcon} from '../../../assets/svg';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {colors, styles} from '../../../themes';
import FText from '../../../components/common/FText';
import {LikeAndConnectData, MakePartnersData} from '../../../api/constant';
import FastImage from 'react-native-fast-image';
import flex from '../../../themes/flex';
import {StackNav} from '../../../navigation/navigationKey';

export default function MatchesScreen({navigation}) {
  const RightIcon = () => {
    return (
      <TouchableOpacity style={localStyle.notificationBg}>
        <FilterIcon />
      </TouchableOpacity>
    );
  };

  const HeaderCategories = ({item, index}) => {
    return (
      <View style={localStyle.itemContainer} key={item}>
        <View style={localStyle.imageBorder}>
          <FastImage source={item.image} style={[localStyle.itemImage]}>
            {item.svgIcon}
          </FastImage>
        </View>
        <FText type={'m14'} style={localStyle.titleText} align={'center'}>
          {item.title} <FText color={colors.secondary1}>{item.value}</FText>
        </FText>
      </View>
    );
  };

  const onPressUserProfile = item => {
    navigation.navigate(StackNav.MatchesUserDetails, {item: item});
  };

  const yourMatches = ({item, index}) => {
    return (
      <TouchableOpacity
        style={localStyle.matchesContainer}
        activeOpacity={0.7}
        onPress={() => onPressUserProfile(item)}>
        <ImageBackground
          source={item?.image}
          style={localStyle.userImage}
          imageStyle={{borderRadius: moderateScale(20)}}>
          <LinearGradient
            start={{x: 1, y: 0.5}}
            end={{x: 1, y: 1}}
            colors={[
              colors.linearColor1,
              colors.linearColor2,
              colors.linearColor3,
            ]}
            style={localStyle.linearStyle}>
            <View style={localStyle.matchesHeaderContainer}>
              <FText type={'S12'} align={'center'} color={colors.white}>
                {item.matches}{' '}
                <FText color={colors.white}>{strings.match}</FText>
              </FText>
            </View>
            <View style={localStyle.bottomContainer}>
              <View style={localStyle.interestContainer}>
                <FText color={colors.white} type={'M12'}>
                  {item.distance}
                </FText>
              </View>
              <View style={localStyle.userNameWithMark}>
                <FText type={'B14'} color={colors.white} align={'center'}>
                  {item.userName}
                </FText>
                {item?.tickMark ? <View style={localStyle.greenTick} /> : null}
              </View>
              <FText
                type={'M12'}
                color={colors.white20}
                align={'center'}
                style={localStyle.cityNameText}>
                {item.cityName}
              </FText>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView>
      <FHeader title={strings.matches} rightIcon={<RightIcon />} />
      <ScrollView
        contentContainerStyle={localStyle.mainViewRoot}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.flexRow}>
          {LikeAndConnectData.map((item, index) => {
            return <HeaderCategories item={item} />;
          })}
        </View>
        <FText
          type={'B20'}
          color={colors.primary}
          style={localStyle.yourMatchesHeader}>
          {strings.yourMatches} <FText color={colors.secondary1}>{' 47'}</FText>
        </FText>
        <FlatList
          data={MakePartnersData()}
          renderItem={yourMatches}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  notificationBg: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40 / 2),
    borderColor: colors.lightGray,
    borderWidth: moderateScale(1),
    ...styles.center,
  },
  mainViewRoot: {
    ...styles.ph20,
    paddingBottom: moderateScale(70),
  },
  likeAndConnectContainer: {
    height: moderateScale(72),
    width: moderateScale(72),
    borderRadius: moderateScale(36),
    ...styles.mh15,
    borderWidth: moderateScale(2),
    borderColor: colors.secondary1,
    ...styles.selfCenter,
  },
  image: {
    height: moderateScale(64),
    width: moderateScale(64),
    borderWidth: moderateScale(3),
    borderColor: colors.white,
    borderRadius: moderateScale(32),
    ...styles.center,
  },
  titleText: {
    ...styles.mt5,
  },
  itemContainer: {
    alignItems: 'center',
    ...styles.mr20,
  },
  imageBorder: {
    borderWidth: moderateScale(2),
    borderColor: colors.secondary1,
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
  },
  itemImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(2),
    borderColor: colors.white,
    ...styles.center,
  },
  itemUsername: {
    ...styles.mt10,
  },
  yourMatchesHeader: {
    ...styles.mv10,
  },
  matchesContainer: {
    width: deviceWidth - moderateScale(215),
    borderWidth: moderateScale(6),
    borderRadius: moderateScale(24),
    ...styles.mr10,
    borderColor: colors.secondary1,
    ...styles.mv10,
  },
  userImage: {
    height: getHeight(245),
  },
  matchesHeaderContainer: {
    height: getHeight(24),
    width: getWidth(98),
    borderBottomEndRadius: moderateScale(16),
    backgroundColor: colors.secondary1,
    borderBottomLeftRadius: moderateScale(16),
    ...styles.selfCenter,
    ...styles.center,
    position: 'absolute',
  },
  linearStyle: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(20),
    ...styles.justifyBetween,
  },
  interestContainer: {
    height: moderateScale(18),
    borderRadius: moderateScale(32),
    ...styles.center,
    borderWidth: moderateScale(1),
    borderColor: colors.grayScale100,
    backgroundColor: colors.transparent,
    ...styles.mv5,
    ...styles.ph5,
  },
  bottomContainer: {
    bottom: moderateScale(10),
    position: 'absolute',
    ...styles.selfCenter,
  },
  cityNameText: {
    ...styles.mv5,
  },
  userNameWithMark: {
    ...styles.rowCenter,
  },
  greenTick: {
    height: moderateScale(6),
    width: moderateScale(6),
    borderRadius: moderateScale(6 / 2),
    backgroundColor: colors.green,
    ...styles.mh5,
  },
});
