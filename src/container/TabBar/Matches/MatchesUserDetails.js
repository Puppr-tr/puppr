import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FHeader from '../../../components/common/FHeader';
import {colors, styles} from '../../../themes';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../../common/constants';
import {
  Distance_Icon,
  InstagramIcon,
  LanguageIcon,
  Scale_Icon,
  TwitterIcon,
} from '../../../assets/svg';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import {
  GenderAgeFrData,
  InterestData,
  LikeDisLikeBtnData,
} from '../../../api/constant';
import images from '../../../assets/images';

export default function MatchesUserDetails({route}) {
  const item = route?.params?.item;

  const RightIcon = () => {
    return (
      <View style={localStyle.distanceContainer}>
        <Distance_Icon />
        <FText type={'M16'} color={colors.white} style={localStyle.nearByText}>
          {item.nearBy}
        </FText>
      </View>
    );
  };

  const myInterest = ({item, index}) => {
    return (
      <View style={localStyle.myInterestContainer}>
        <FText type={'M16'}>{item}</FText>
      </View>
    );
  };

  const GenderAgeFr = ({item, index}) => {
    return (
      <View style={localStyle.genderAgeRoot}>
        <View style={localStyle.iconBg}>
          {item?.iconName ? (
            <Ionicons
              name={item.iconName}
              color={colors.white}
              size={moderateScale(24)}
            />
          ) : (
            item?.svgIcon
          )}
        </View>
        <FText
          type={'R16'}
          color={colors.modalBg}
          align={'center'}
          style={localStyle.titleText}>
          {item.title}
        </FText>
        <FText type={'M18'} color={colors.primary} align={'center'}>
          {item.value}
        </FText>
      </View>
    );
  };
  const UserInfo = ({title, svgIcon, value}) => {
    return (
      <View>
        <View style={localStyle.userInfoRoot}>
          <View style={localStyle.iconAndTitle}>
            {svgIcon}
            <FText type={'R16'} color={colors.grayScale500} style={styles.ml10}>
              {title}
            </FText>
          </View>
          <FText type={'M16'}>{value}</FText>
        </View>
        <View style={localStyle.lineView} />
      </View>
    );
  };

  const HeaderContainer = ({item, index}) => {
    return (
      <View style={localStyle.rootContainer}>
        <View style={localStyle.gestureHandler} />
        <FText
          type={'R16'}
          style={localStyle.labelContainer}
          color={colors.grayScale400}>
          {strings.about}
        </FText>
        <FText type={'M16'}>{strings.aboutText}</FText>
        <FText
          type={'R16'}
          style={localStyle.labelContainer}
          color={colors.grayScale400}>
          {strings.interest}
        </FText>
      </View>
    );
  };
  const LikeDislikeBtn = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          localStyle.root,
          {
            backgroundColor: item.bgColor,
          },
        ]}>
        <Ionicons
          name={item.iconName}
          size={moderateScale(28)}
          color={item.iconColor}
        />
      </TouchableOpacity>
    );
  };

  const FooterListComponents = () => {
    return (
      <View>
        <View style={localStyle.ageGenderFrRoot}>
          {GenderAgeFrData.map((item, index) => {
            return <GenderAgeFr item={item} />;
          })}
        </View>
        <View style={localStyle.rootContainer}>
          <FText type={'S18'} style={localStyle.labelContainer}>
            {item?.name + "'s info"}
          </FText>
          <UserInfo
            title={strings.height}
            svgIcon={<Scale_Icon />}
            value={'175 cm'}
          />
          <UserInfo
            title={strings.speak}
            svgIcon={<LanguageIcon />}
            value={'German, English'}
          />
          <View style={localStyle.matchesImageAndText}>
            <Image
              source={images.MatchProfileImage}
              style={localStyle.currentUserImage}
            />
            <Image source={item.image} style={localStyle.matchProfileImage} />
            <FText
              type={'B14'}
              style={localStyle.labelContainer}
              color={colors.primary}
              align={'center'}>
              {strings.matchingText}
            </FText>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ImageBackground source={item.image} style={localStyle.backgroundImage}>
      <LinearGradient
        start={{x: 1, y: 0.2}}
        end={{x: 1, y: 0.8}}
        colors={[colors.linearColor1, colors.linearColor2, colors.linearColor3]}
        style={localStyle.linearStyle}>
        <FHeader color={colors.white} rightIcon={<RightIcon />} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={localStyle.contentContainerStyle}>
          <View />
          <View style={localStyle.scrollIndicator} />
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
          <View style={localStyle.bottomSheet}>
            <FlatList
              renderItem={myInterest}
              data={InterestData.slice(0, 4)}
              numColumns={3}
              ListHeaderComponent={HeaderContainer}
              ListFooterComponent={FooterListComponents}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <View style={localStyle.bottomBtnContainer}>
          {LikeDisLikeBtnData.map((item, index) => {
            return <LikeDislikeBtn item={item} />;
          })}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const localStyle = StyleSheet.create({
  mainBg: {
    backgroundColor: colors.white,
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  linearStyle: {
    borderRadius: moderateScale(20),
    ...styles.mt20,
    ...styles.flex,
  },
  distanceContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    ...styles.center,
    borderColor: colors.grayScale100,
    backgroundColor: colors.transparent,
    ...styles.mv5,
    ...styles.ph5,
    ...styles.rowCenter,
  },
  nearByText: {
    ...styles.ml5,
  },
  scrollIndicator: {
    height: moderateScale(64),
    width: moderateScale(6),
    borderRadius: moderateScale(24),
    backgroundColor: colors.transparent,
    ...styles.selfEnd,
    ...styles.mr10,
  },
  matchPartnerDetailsContainer: {
    ...styles.selfCenter,
    ...styles.mv20,
  },
  locationText: {
    ...styles.mt10,
  },
  socialIcon: {
    ...styles.rowCenter,
    ...styles.mv10,
    gap: moderateScale(10),
  },
  bottomSheet: {
    borderTopRightRadius: moderateScale(32),
    borderTopLeftRadius: moderateScale(32),
    backgroundColor: colors.white,
    top: moderateScale(70),
    paddingBottom: moderateScale(60),
  },
  gestureHandler: {
    height: moderateScale(6),
    width: moderateScale(60),
    backgroundColor: colors.grayScale200,
    ...styles.selfCenter,
    borderRadius: moderateScale(24),
    ...styles.mv10,
  },
  labelContainer: {
    ...styles.mv10,
  },
  myInterestContainer: {
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    ...styles.p10,
    ...styles.mv5,
    ...styles.mh5,
  },
  interestRoot: {
    ...styles.flexRow,
    ...styles.wrap,
  },
  ageGenderFrRoot: {
    width: '100%',
    height: getHeight(150),
    backgroundColor: colors.pinkBg,
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.ph20,
    ...styles.justifyBetween,
  },
  rootContainer: {
    ...styles.p10,
  },
  iconBg: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: colors.secondary1,
    ...styles.center,
  },
  genderAgeRoot: {
    ...styles.p5,
    ...styles.center,
  },
  titleText: {
    ...styles.mv10,
  },
  userInfoRoot: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  iconAndTitle: {
    ...styles.rowCenter,
  },
  lineView: {
    height: moderateScale(1),
    backgroundColor: colors.grayScale200,
    width: '100%',
  },
  matchesImageAndText: {
    ...styles.flexRow,
    ...styles.mv10,
  },
  currentUserImage: {
    height: moderateScale(32),
    width: moderateScale(32),
    ...styles.mh10,
  },
  matchProfileImage: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderTopRightRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(16),
    borderBottomRightRadius: moderateScale(16),
    ...styles.mr10,
  },
  bottomBtnContainer: {
    height: getHeight(75),
    width: '80%',
    borderRadius: moderateScale(40),
    backgroundColor: colors.white,
    ...styles.selfCenter,
    position: 'absolute',
    bottom: moderateScale(20),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    ...styles.center,
    ...styles.flexRow,
    ...styles.wrap,
  },
  root: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    ...styles.center,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    ...styles.mh20,
    ...styles.mv10,
  },
  contentContainerStyle: {
    ...styles.justifyBetween,
    paddingBottom: moderateScale(100),
  },
});
