import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import FHeader from '../../../components/common/FHeader';
import {colors, styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import {DiscoverByInterestData} from '../../../api/constant';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';

export default function DiscoverByInterest() {
  const DiscoverByInterest = ({item, index}) => {
    return (
      <TouchableOpacity style={localStyle.interestDataRoot}>
        <View style={localStyle.imageAndTextRoot}>
          <Image source={item.image} style={localStyle.interestImage} />
          <View style={localStyle.interestText}>
            <FText type={'S18'}>{item.title}</FText>
            <FText
              type={'M16'}
              color={colors.secondary1}
              style={localStyle.peopleViewer}>
              {item.value}
            </FText>
          </View>
        </View>
        <Ionicons
          name={'chevron-forward-outline'}
          color={colors.grayScale400}
          size={moderateScale(24)}
        />
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView style={localStyle.mainScreenView}>
      <FHeader />
      <View style={localStyle.root}>
        <View style={localStyle.headerContainer}>
          <FText type={'B24'}>{strings.discoverByInterest}</FText>
          <View style={localStyle.popularTextRoot}>
            <FText type={'M16'} color={colors.grayScale400}>
              {strings.popular}
            </FText>
            <Ionicons
              name={'chevron-down-outline'}
              color={colors.grayScale400}
              size={moderateScale(16)}
              style={localStyle.downIcon}
            />
          </View>
        </View>
        <FlatList
          data={DiscoverByInterestData}
          renderItem={DiscoverByInterest}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
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
    ...styles.flex,
  },
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  interestDataRoot: {
    height: getHeight(90),
    width: '100%',
    borderRadius: moderateScale(16),
    backgroundColor: colors.pinkBg,
    ...styles.mv10,
    ...styles.p15,
    ...styles.rowSpaceBetween,
  },
  popularTextRoot: {
    ...styles.flexRow,
  },
  downIcon: {
    ...styles.ml5,
    ...styles.mt2,
  },
  interestImage: {
    height: moderateScale(64),
    width: moderateScale(64),
  },
  interestText: {
    ...styles.ml10,
    ...styles.mt10,
  },
  imageAndTextRoot: {
    ...styles.flexRow,
  },
  peopleViewer: {
    ...styles.mt10,
  },
});
