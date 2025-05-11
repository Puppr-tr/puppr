import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// custom import
import {colors, styles} from '../../../themes';
import {MakePartnersData} from '../../../api/constant';
import {getHeight, getWidth, moderateScale} from '../../../common/constants';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';

export default function DiscoverPeopleComponent() {
  const discoverPeople = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          style={localStyle.mainImageContainer}
          source={item.image}
          imageStyle={{borderRadius: moderateScale(12)}}>
          <LinearGradient
            start={{x: 1, y: 0.5}}
            end={{x: 1, y: 1}}
            colors={[
              colors.linearColor1,
              colors.linearColor2,
              colors.linearColor3,
            ]}
            style={localStyle.linearStyle}>
            <View style={localStyle.newContainer}>
              <FText type={'S12'} color={colors.white} align={'center'}>
                {strings.new}
              </FText>
            </View>
            <View>
              <View style={localStyle.interestContainer}>
                <FText color={colors.white} type={'M12'}>
                  {item.distance}
                </FText>
              </View>
              <FText type={'B14'} color={colors.white} align={'center'}>
                {item.userName}
              </FText>
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
    <FlatList
      data={MakePartnersData()}
      renderItem={discoverPeople}
      bounces={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const localStyle = StyleSheet.create({
  mainImageContainer: {
    height: getHeight(160),
    width: getWidth(110),
    ...styles.mr15,
  },
  linearStyle: {
    height: getHeight(160),
    width: getWidth(110),
    borderRadius: moderateScale(12),
    ...styles.justifyBetween,
  },
  newContainer: {
    height: moderateScale(18),
    width: moderateScale(35),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: colors.secondary1,
    backgroundColor: colors.primary,
    ...styles.center,
    ...styles.m10,
  },
  interestContainer: {
    height: moderateScale(18),
    borderRadius: moderateScale(32),
    ...styles.center,
    borderWidth: moderateScale(1),
    borderColor: colors.grayScale100,
    backgroundColor: colors.transparent,
    ...styles.mv5,
    ...styles.mh10,
  },
  cityNameText: {
    ...styles.mt5,
    ...styles.mb10,
  },
});

// export default memo(DiscoverPeopleComponent);
