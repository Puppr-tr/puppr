import {Animated, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// custom import
import {colors, styles} from '../../../themes';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import FText from '../../../components/common/FText';
import {InstagramIcon, TwitterIcon} from '../../../assets/svg';
import CardBtnComponents from './CardBtnComponents';
import CustomPercentageCircle from '../../../components/Home/CustomPercentageCircle';

export default function SearchPartners(props) {
  const {item, isFirst, swipe, ...rest} = props;

  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const disLikeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onSuperLike = swipe.y.interpolate({
    inputRange: [-200, -40],
    outputRange: [1, -2],
    extrapolate: 'clamp',
  });
  const likeData = useMemo(() => {
    return {
      opacity: likeOpacity,
      style: {
        left: moderateScale(30),
        top: moderateScale(50),
      },
    };
  }, []);

  const disLikeData = useMemo(() => {
    return {
      opacity: disLikeOpacity,
      style: {
        right: moderateScale(30),
        top: moderateScale(50),
      },
    };
  }, []);

  const superLikeData = useMemo(() => {
    return {
      opacity: onSuperLike,
      style: {
        bottom: moderateScale(150),
        ...styles.selfCenter,
      },
    };
  }, []);

  return (
    <Animated.View
      style={[
        localStyle.mainContainer,
        isFirst && {transform: [...swipe.getTranslateTransform(), {rotate}]},
      ]}
      {...rest}>
      <ImageBackground
        source={item.image}
        style={localStyle.matchesUserImage}
        imageStyle={{borderRadius: moderateScale(24)}}>
        <LinearGradient
          start={{x: 1, y: 0.5}}
          end={{x: 1, y: 1}}
          colors={[
            colors.linearColor1,
            colors.linearColor2,
            colors.linearColor3,
          ]}
          style={localStyle.linearStyle}>
          <View style={localStyle.distanceAndMatchesContainer}>
            <View style={localStyle.interestContainer}>
              <FText color={colors.white} type={'M16'}>
                {item.distance}
              </FText>
            </View>
            <CustomPercentageCircle progressText={item.matches} />
          </View>
          <View style={localStyle.scrollIndicator}></View>

          <View style={localStyle.matchPartnerDetailsContainer}>
            <View style={localStyle.socialIcon}>
              <TwitterIcon />
              <InstagramIcon />
            </View>
            <FText type={'B24'} color={colors.white}>
              {item.matchesUserName}
            </FText>
            <FText
              type={'M14'}
              color={colors.grayScale50}
              align={'center'}
              style={localStyle.locationText}>
              {item.location}
            </FText>
          </View>
        </LinearGradient>
        {isFirst && (
          <CardBtnComponents
            iconName={'close'}
            iconColor={colors.primary}
            bgColor={colors.white}
            cardStyle={disLikeData}
          />
        )}
        {isFirst && (
          <CardBtnComponents
            iconName={'star'}
            iconColor={colors.white}
            bgColor={colors.primary}
            cardStyle={superLikeData}
          />
        )}
        {isFirst && (
          <CardBtnComponents
            iconName={'heart'}
            iconColor={colors.white}
            bgColor={colors.secondary1}
            cardStyle={likeData}
          />
        )}
      </ImageBackground>
    </Animated.View>
  );
}

const localStyle = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
  },
  matchesUserImage: {
    height: getHeight(400),
    width: deviceWidth - moderateScale(60),
    ...styles.selfCenter,
    resizeMode: 'cover',
  },
  linearStyle: {
    height: getHeight(400),
    width: deviceWidth - moderateScale(60),
    borderRadius: moderateScale(24),
    ...styles.justifyBetween,
  },
  interestContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(32),
    ...styles.center,
    borderWidth: moderateScale(1),
    borderColor: colors.grayScale100,
    width: getWidth(110),
    backgroundColor: colors.transparent,
  },
  distanceAndMatchesContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
    ...styles.mh20,
  },
  matchesPercent: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
    ...styles.center,
    borderWidth: moderateScale(4),
    borderColor: colors.white,
  },
  socialIcon: {
    ...styles.rowCenter,
    ...styles.mv10,
    gap: moderateScale(10),
  },
  matchPartnerDetailsContainer: {
    ...styles.selfCenter,
    ...styles.mv20,
  },
  locationText: {
    ...styles.mt10,
  },
  likeAndDislikeBtnBg: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    ...styles.center,
    ...styles.mh20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  renderLikeAndDislikeBtn: {
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.mt20,
    ...styles.selfCenter,
  },
  scrollIndicator: {
    height: moderateScale(64),
    width: moderateScale(6),
    borderRadius: moderateScale(24),
    backgroundColor: colors.transparent,
    ...styles.selfEnd,
  },
});
