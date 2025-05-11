import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import {USER_DATA, moderateScale, deviceWidth, getHeight, getWidth} from '../../../common/constants';
import {
  FilterIcon,
  LikeIcon,
  NetworkIcon,
  NotificationIcon,
  StoryAddIcon,
} from '../../../assets/svg';
import UserStories from './UserStory/UserStories';
import images from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {MakeFriendsData, UserDetails} from '../../../api/constant';
import MakeFriends from './MakeFriends';
import SearchPartnerCard from './SearchPartnerCard';
import {StackNav} from '../../../navigation/navigationKey';
import {getAsyncStorageData} from '../../../utils/AsyncStorage';
import {useIsFocused} from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const [isSelect, setIsSelect] = useState(0);
  const isFocused = useIsFocused();
  const [userImage, setUserImage] = useState('');

  const userDetails = async () => {
    const data = await getAsyncStorageData(USER_DATA);
    setUserImage(data?.userImage);
  };

  useEffect(() => {
    isFocused && userDetails();
  }, [isFocused]);

  const categoryData = [
    {
      id: 0,
      title: strings.makeFriends,
      onPress: () => setIsSelect(0),
    },
    {
      id: 1,
      title: strings.searchPartners,
      onPress: () => setIsSelect(1),
    },
  ];

  const UserProfile = React.memo(() => {
    return (
      <View style={localStyle.itemContainer}>
        <View style={localStyle.itemInnerContainer}>
          <FastImage
            source={userImage ? {uri: userImage} : images.UserImage1}
            style={[
              localStyle.itemImage,
              {
                borderWidth: moderateScale(1),
              },
            ]}
          />

          <StoryAddIcon
            name="plus"
            style={localStyle.addIcon}
            width={moderateScale(25)}
            height={moderateScale(25)}
          />
        </View>
        <FText
          type={'s14'}
          style={localStyle.itemUsername}
          color={colors.black}>
          {'Your Story'}
        </FText>
      </View>
    );
  });
  const HeaderStory = () => {
    return (
      <UserStories
        ListHeaderComponent={<UserProfile />}
        stories={UserDetails}
      />
    );
  };

  const onPressProfile = () => {
    navigation.navigate(StackNav.Profile);
  };
  const HeaderCategory = () => {
    return categoryData.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          style={[
            localStyle.root,
            {
              backgroundColor: isSelect === item.id ? colors.white : null,
            },
          ]}>
          <FText
            type={'M12'}
            align={'center'}
            style={styles.ml5}
            color={colors.primary}>
            {item.title}
          </FText>
        </TouchableOpacity>
      );
    });
  };

  const MakeFriendsHeader = () => {
    return (
      <View>
        <View style={localStyle.headerContainer}>
          <FText type={'B28'} color={colors.primary}>
            {strings.friendzy}
          </FText>
          <TouchableOpacity style={localStyle.notificationBg}>
            <NotificationIcon />
          </TouchableOpacity>
        </View>
        <HeaderStory />
      </View>
    );
  };

  const SearchPartnerHeader = () => {
    return (
      <View style={localStyle.headerContainer}>
        <TouchableOpacity onPress={onPressProfile}>
          <Image
            style={localStyle.userImage}
            source={userImage ? {uri: userImage} : images.UserImage1}
          />
        </TouchableOpacity>
        <View style={localStyle.likeAndFilterContainer}>
          <TouchableOpacity
            style={[
              localStyle.notificationBg,
              {
                ...styles.mr10,
              },
            ]}>
            <LikeIcon />
          </TouchableOpacity>
          <TouchableOpacity style={localStyle.notificationBg}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AroundMeSection = () => {
    return (
      <View style={localStyle.aroundMeContainer}>
        <FText type={'B20'} style={localStyle.aroundMeText}>
          {strings.aroundMe}
        </FText>
        <FText type={'M14'} color={colors.grayScale500}>
          {strings.peopleWith}
          <FText color={colors.secondary1}> {'"Walk"'} </FText>
          <FText type={'M14'} color={colors.grayScale500}>
            {strings.interestAroundYou}
          </FText>
        </FText>
        <ImageBackground
          source={images.AroundPeopleMap}
          style={localStyle.mapImage}
          imageStyle={{borderRadius: moderateScale(24)}}>
          <View style={localStyle.connectedContainer}>
            <View style={localStyle.connectedIconAndText}>
              <NetworkIcon />
              <FText type={'S12'} color={colors.white}>
                {strings.connectedWith + ' 👋'}
              </FText>
            </View>
            <View style={localStyle.dotBg}>
              <View style={localStyle.dotStyle} />
            </View>
          </View>
          <View style={localStyle.imageBg}>
            <Image source={images.UserImage2} style={localStyle.userImage} />
          </View>
          <Image source={images.UserMapImage} style={localStyle.userMapImage} />
          <Image source={images.UserImage3} style={localStyle.userImagePicture} />
          <Image source={images.UserImage1} style={localStyle.userImageMapThird} />
        </ImageBackground>
      </View>
    );
  };

  return (
    <FSafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyle.mainContainerView}>
        {isSelect === 0 ? <MakeFriendsHeader /> : <SearchPartnerHeader />}
        <View style={[localStyle.itemSelectContainer, styles.mt15]}>
          <HeaderCategory />
        </View>
        {isSelect === 0 && <AroundMeSection />}
        <View>
          {isSelect === 0 ? (
            <MakeFriends data={MakeFriendsData} />
          ) : (
            <SearchPartnerCard />
          )}
        </View>
      </ScrollView>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  mainContainerView: {
    ...styles.ph20,
    // ...styles.flex,
  },
  notificationBg: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48 / 2),
    borderColor: colors.lightGray,
    borderWidth: moderateScale(1),
    ...styles.center,
  },
  itemContainer: {
    alignItems: 'center',
    ...styles.mr20,
  },
  itemInnerContainer: {
    padding: moderateScale(2),
    borderRadius: moderateScale(43),
  },
  itemImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(64 / 2),
    borderColor: colors.pinkBg,
  },
  itemUsername: {
    ...styles.mt5,
  },
  addIcon: {
    position: 'absolute',
    bottom: 2,
    right: 1,
    borderRadius: moderateScale(20),
  },
  root: {
    height: moderateScale(36),
    width: '50%',
    ...styles.p10,
    ...styles.center,
    borderRadius: moderateScale(16),
  },
  itemSelectContainer: {
    height: moderateScale(44),
    width: '100%',
    ...styles.rowCenter,
    borderRadius: moderateScale(16),
    ...styles.p5,
    ...styles.selfCenter,
    backgroundColor: colors.btnBg,
  },
  userImage: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48 / 2),
  },
  likeAndFilterContainer: {
    ...styles.rowCenter,
  },
  aroundMeContainer: {
    ...styles.mt20,
    ...styles.mb10,
  },
  aroundMeText: {
    ...styles.mb5,
  },
  mapImage: {
    height: getHeight(375),
    width: deviceWidth - moderateScale(40),
    ...styles.mt10,
    ...styles.p20,
  },
  connectedContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: colors.primary,
    ...styles.center,
    width: getWidth(170),
    gap: moderateScale(5),
    position: 'relative',
  },
  connectedIconAndText: {
    ...styles.rowCenter,
    gap: moderateScale(5),
  },
  dotBg: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -moderateScale(6) }],
    bottom: moderateScale(-6),
    borderWidth: moderateScale(4),
    borderColor: colors.primary,
    borderRadius: moderateScale(6),
    ...styles.center,
  },
  dotStyle: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: colors.white,
  },
  imageBg: {
    height: moderateScale(54),
    width: moderateScale(54),
    borderRadius: moderateScale(27),
    backgroundColor: colors.primary,
    left: moderateScale(50),
    ...styles.center,
    ...styles.mt15,
  },
  userMapImage: {
    position: 'absolute',
    right: moderateScale(50),
    top: moderateScale(100),
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  userImagePicture: {
    position: 'absolute',
    right: moderateScale(100),
    top: moderateScale(150),
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  userImageMapThird: {
    position: 'absolute',
    left: moderateScale(40),
    bottom: moderateScale(40),
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
});
