import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import {
  FilterIcon,
  Location_Icon,
  NetworkIcon,
  SearchIcon,
} from '../../../assets/svg';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import DiscoverPeopleComponent from './DiscoverPeopleComponent';
import {InterestData} from '../../../api/constant';
import images from '../../../assets/images';
import FSearchInput from '../../../components/common/FSearchInput';
import ExploreFilter from '../../../components/modal/ExploreFilter';
import {StackNav} from '../../../navigation/navigationKey';

export default function ExploreScreen({navigation}) {
  const SheetRef = useRef(null);

  const [isSelect, setIsSelect] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');

  const onPressItem = value => {
    if (isSelect.includes(value)) {
      setIsSelect(isSelect.filter(item => item !== value));
    } else {
      setIsSelect([...isSelect, value]);
    }
  };

  const onPressSearch = () => {
    setIsSearch(true);
  };

  const onPressFilter = () => {
    SheetRef?.current?.show();
  };

  const onPressViewAll = () => {
    navigation.navigate(StackNav.DiscoverByInterest);
  };
  const HeaderContainer = () => {
    return (
      <View style={localStyle.headerCategories}>
        <View>
          <View style={localStyle.locationContainer}>
            <Location_Icon />
            <FText type={'M12'} style={localStyle.locationText}>
              {strings.germany}
            </FText>
            <TouchableOpacity>
              <Ionicons
                name={'chevron-down-outline'}
                size={moderateScale(12)}
                color={colors.secondary1}
              />
            </TouchableOpacity>
          </View>
          <FText type={'B24'}>{strings.discover}</FText>
        </View>
        <View style={localStyle.searchFilterBtn}>
          <TouchableOpacity
            onPress={onPressSearch}
            style={[
              localStyle.searchFilterBg,
              {
                ...styles.mr10,
              },
            ]}>
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyle.searchFilterBg}
            onPress={onPressFilter}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onSearchInput = useCallback(text => {
    setSearch(text);
  }, []);

  const onPressClose = () => {
    setIsSearch(false);
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressClose}>
        <Ionicons
          name={'close'}
          size={moderateScale(24)}
          color={colors.grayScale400}
        />
      </TouchableOpacity>
    );
  };
  const InterestCategories = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          localStyle.interestContainer,
          isSelect.includes(item) && {backgroundColor: colors.secondary1},
        ]}
        onPress={() => onPressItem(item)}>
        <FText
          type={'M16'}
          color={isSelect.includes(item) ? colors.white : colors.primary}>
          {item}
        </FText>
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView style={localStyle.mainContainerView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyle.root}>
        {isSearch === true ? (
          <View style={localStyle.searchHeader}>
            <FSearchInput
              search={search}
              onSearchInput={onSearchInput}
              rightIcon={() => <RightIcon />}
            />
            <TouchableOpacity
              style={[localStyle.searchFilterBg, styles.ml10]}
              onPress={onPressFilter}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <HeaderContainer />
        )}
        {isSearch !== true && <DiscoverPeopleComponent />}
        <View style={localStyle.interestHeaderContainer}>
          <FText type={'B20'}>{strings.interest}</FText>
          <TouchableOpacity onPress={onPressViewAll}>
            <FText type={'M16'} color={colors.secondary1}>
              {strings.viewAll}
            </FText>
          </TouchableOpacity>
        </View>
        <View style={localStyle.interestDataContainer}>
          {InterestData.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  localStyle.interestContainer,
                  isSelect.includes(item) && {
                    backgroundColor: colors.secondary1,
                  },
                ]}
                onPress={() => onPressItem(item)}>
                <FText
                  type={'M16'}
                  color={
                    isSelect.includes(item) ? colors.white : colors.primary
                  }>
                  {item}
                </FText>
              </TouchableOpacity>
            );
          })}
        </View>
        <FText type={'B20'} style={localStyle.aroundMeText}>
          {strings.aroundMe}
        </FText>
        <FText type={'M14'} color={colors.grayScale500}>
          {strings.peopleWith}
          <FText color={colors.secondary1}> {'"Music"'} </FText>
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
            <Image source={images.UserImage4} style={localStyle.userImage} />
          </View>
          <Image source={images.UserMapImage} style={localStyle.userMapImage} />
          <Image
            source={images.UserMapImage2}
            style={localStyle.userImagePicture}
          />
        </ImageBackground>
        <ExploreFilter SheetRef={SheetRef} />
      </ScrollView>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainContainerView: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  root: {
    ...styles.ph20,
    paddingBottom: moderateScale(50),
  },
  headerCategories: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  locationContainer: {
    ...styles.rowCenter,
    ...styles.mb5,
  },
  locationText: {
    ...styles.mh5,
  },
  searchFilterBtn: {
    ...styles.rowCenter,
  },
  searchFilterBg: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(48 / 2),
    borderColor: colors.lightGray,
    borderWidth: moderateScale(1),
    ...styles.center,
  },
  interestHeaderContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt15,
  },
  interestContainer: {
    height: moderateScale(32),
    ...styles.center,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    borderColor: colors.selectBorder,
    ...styles.m5,
    ...styles.ph10,
  },
  interestDataContainer: {
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.mt10,
  },
  aroundMeText: {
    ...styles.mv5,
    ...styles.mt10,
  },
  mapImage: {
    height: getHeight(375),
    width: deviceWidth - moderateScale(40),
    ...styles.mt10,
    ...styles.mb30,
    ...styles.p20,
  },
  connectedContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: colors.primary,
    ...styles.center,
    width: getWidth(170),
    gap: moderateScale(5),
  },
  userImage: {
    borderEndWidth: moderateScale(4),
    borderColor: colors.primary,
    height: moderateScale(64),
    width: moderateScale(64),
    borderRadius: moderateScale(32),
    position: 'absolute',
  },
  imageBg: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(35),
    backgroundColor: colors.primary,
    left: moderateScale(50),
    ...styles.center,
    ...styles.mt15,
  },
  dotStyle: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: colors.white,
  },
  dotBg: {
    borderWidth: moderateScale(4),
    borderColor: colors.primary,
    borderRadius: moderateScale(6),
    ...styles.center,
  },
  connectedIconAndText: {
    ...styles.flexRow,
    marginTop: moderateScale(13),
    ...styles.itemsCenter,
  },
  userMapImage: {
    height: getHeight(120),
    width: getWidth(120),
    left: moderateScale(150),
  },
  userImagePicture: {
    height: moderateScale(93),
    width: moderateScale(93),
    left: moderateScale(30),
  },
  searchHeader: {
    ...styles.rowCenter,
    ...styles.ph20,
  },
});
