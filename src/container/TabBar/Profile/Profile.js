import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import FHeader from '../../../components/common/FHeader';
import images from '../../../assets/images';
import {
  USER_DATA,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../../common/constants';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import FButton from '../../../components/common/FButton';
import {SettingData} from '../../../api/constant';
import {StackNav} from '../../../navigation/navigationKey';
import {getAsyncStorageData} from '../../../utils/AsyncStorage';
import {useIsFocused} from '@react-navigation/native';

export default function Profile({navigation}) {
  const [userImage, setUserImage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && userDetails();
  }, [isFocused]);

  const onPressItem = item => {
    if (item?.route) {
      navigation.navigate(item?.route);
    }
  };

  const userDetails = async () => {
    const data = await getAsyncStorageData(USER_DATA);
    setUserImage(data?.userImage);
  };

  const categories = ({item, index}) => {
    return (
      <TouchableOpacity
        style={localStyle.settingDataContainer}
        key={index}
        onPress={() => onPressItem(item)}>
        <View style={localStyle.iconAndTitle}>
          {item.iconName}
          <FText type={'M16'} style={localStyle.titleText}>
            {item.title}
          </FText>
        </View>
        <View style={localStyle.languageAndIconContainer}>
          <FText
            type={'M14'}
            color={colors.grayScale400}
            style={localStyle.languageText}>
            {item?.value}
          </FText>

          <Ionicons
            name={'chevron-forward-outline'}
            color={colors.grayScale400}
            size={moderateScale(24)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const onPressEditProfile = () => {
    navigation.navigate(StackNav.EditProfile);
  };
  return (
    <FSafeAreaView style={localStyle.mainScreenView}>
      <FHeader />
      <View style={localStyle.root}>
        <Image
          source={userImage ? {uri: userImage} : images.UserImage1}
          style={localStyle.profileImage}
        />
        <FText type={'B24'} align={'center'} style={localStyle.userName}>
          {strings.userName}
        </FText>
        <FText type={'M14'} align={'center'} color={colors.grayScale400}>
          {strings.floridaUs}
        </FText>
        <View style={localStyle.editProfileContainer}>
          <View style={localStyle.imageAndText}>
            <Image
              source={images.PercentageImage}
              style={localStyle.percentageImage}
            />
            <FText
              type={'S12'}
              color={colors.white}
              style={localStyle.completeProfileText}>
              {strings.completeYourProfileToStandOut}
            </FText>
          </View>
          <FButton
            title={strings.editProfile}
            containerStyle={localStyle.btnStyle}
            onPress={onPressEditProfile}
          />
        </View>
        <FlatList
          data={SettingData}
          renderItem={categories}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
        <View style={localStyle.bottomContainer}>
          <View style={localStyle.iconBg}>
            <Ionicons
              name={'star'}
              size={moderateScale(28)}
              color={colors.white}
            />
          </View>
          <FText type={'B16'} align={'center'} color={colors.primary}>
            {strings.getMoreMatches}
          </FText>
          <FText
            type={'R12'}
            align={'center'}
            color={colors.grayScale500}
            style={styles.mv10}>
            {strings.beSeenByMorePeopleInEncounters}
          </FText>
          <FText type={'S12'} align={'center'} color={colors.secondary1}>
            {strings.upgradeToPremium}
          </FText>
        </View>
      </View>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainScreenView: {
    backgroundColor: colors.white,
  },
  root: {
    ...styles.ph20,
  },
  profileImage: {
    height: '16%',
    width: '32%',
    ...styles.selfCenter,
    borderRadius: moderateScale(56),
  },
  userName: {
    ...styles.mv10,
  },
  editProfileContainer: {
    height: moderateScale(64),
    borderRadius: moderateScale(16),
    backgroundColor: colors.secondary1,
    ...styles.mv15,
    ...styles.rowSpaceBetween,
    ...styles.ph10,
  },
  percentageImage: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  completeProfileText: {
    width: '52%',
    ...styles.ml5,
  },
  btnStyle: {
    width: '35%',
    height: moderateScale(36),
  },
  imageAndText: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  settingDataContainer: {
    height: moderateScale(64),
    backgroundColor: colors.white,
    ...styles.ph10,
    ...styles.rowSpaceBetween,
    ...styles.mv10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: moderateScale(16),
    width: deviceWidth - moderateScale(50),
    ...styles.selfCenter,
  },
  iconAndTitle: {
    ...styles.rowCenter,
  },
  titleText: {
    ...styles.ml5,
  },
  bottomContainer: {
    height: getHeight(140),
    borderRadius: moderateScale(12),
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    ...styles.p15,
    backgroundColor: colors.white,
    ...styles.mv10,
  },
  iconBg: {
    height: moderateScale(36),
    width: moderateScale(36),
    borderRadius: moderateScale(36 / 2),
    ...styles.center,
    backgroundColor: colors.secondary1,
    ...styles.selfCenter,
  },
  languageAndIconContainer: {
    ...styles.rowCenter,
  },
  languageText: {
    ...styles.mr10,
  },
});
