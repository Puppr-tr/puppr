import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// custom import
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {colors, styles} from '../../../themes';
import FText from '../../../components/common/FText';
import {Comment_Icon, Like_Icon, Share_Icon} from '../../../assets/svg';

export const LikeCommentData = [
  {
    id: 1,
    iconName: <Like_Icon />,
  },
  {
    id: 2,
    iconName: <Comment_Icon />,
  },
  {
    id: 3,
    iconName: <Share_Icon />,
  },
];

export default function MakeFriends(props) {
  let {data, navigation} = props;
  const swipe = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    swipe.setValue({x: 0, y: 0});
  }, [data]);

  const LikeComment = ({item, index}) => {
    return (
      <TouchableOpacity style={localStyle.likeCommentBg} onPress={item.onPress}>
        {item.iconName}
      </TouchableOpacity>
    );
  };

  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <ImageBackground
          style={[localStyle.bgImage]}
          imageStyle={{borderRadius: moderateScale(32)}}
          source={item.bgImage}>
          <LinearGradient
            start={{x: 0.6, y: 0}}
            end={{x: 1, y: 1.3}}
            colors={[colors.linearColor1, colors.linearColor4]}
            style={localStyle.innerContainer}>
            <View style={localStyle.mainViewContainer}>
              <View style={localStyle.interestContainer}>
                <FText color={colors.white} type={'M14'}>
                  {item.interest}
                </FText>
              </View>
              <View>
                <FText
                  type={'S20'}
                  color={colors.white}
                  style={localStyle.postText}>
                  {item.postText}
                </FText>
                <View style={localStyle.userImageAndName}>
                  <Image
                    source={item.profileImage}
                    style={localStyle.userProfileImage}
                  />
                  <View style={localStyle.userNameContainer}>
                    <FText type={'S14'} color={colors.white}>
                      {item.userName}
                    </FText>
                    <FText
                      type={'S14'}
                      color={colors.grayScale50}
                      style={styles.mt5}>
                      {item.description}
                    </FText>
                  </View>
                </View>
              </View>
            </View>
            <View style={localStyle.likeCommentContainer}>
              <View style={localStyle.lineView} />
              <View>
                {LikeCommentData.map((item, index) => {
                  return <LikeComment item={item} key={item.id} />;
                })}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderData}
      vertical={true}
      bounces={false}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={200}
      contentContainerStyle={localStyle.mainContainer}
      scrollEnabled={false}
      {...props}
    />
  );
}

const localStyle = StyleSheet.create({
  bgImage: {
    height: getHeight(343),
    width: deviceWidth - moderateScale(40),
    ...styles.mv10,
  },
  innerContainer: {
    ...styles.flex,
    height: getHeight(100),
    width: deviceWidth - moderateScale(40),
    borderRadius: moderateScale(32),
    ...styles.rowSpaceBetween,
  },
  mainViewContainer: {
    ...styles.justifyBetween,
    height: '100%',
    ...styles.ml10,
  },
  mainContainer: {
    ...styles.pv10,
    paddingBottom: moderateScale(70),
  },
  interestContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(32),
    ...styles.center,
    borderWidth: moderateScale(1),
    borderColor: colors.grayScale100,
    width: getWidth(100),
    ...styles.mt20,
    backgroundColor: colors.transparent,
  },
  userImageAndName: {
    ...styles.flexRow,
    ...styles.mv20,
  },
  userProfileImage: {
    height: moderateScale(48),
    width: moderateScale(48),
  },
  userNameContainer: {
    ...styles.mt5,
    ...styles.ml10,
  },
  likeCommentContainer: {
    width: getWidth(70),
    height: getHeight(195),
    borderRadius: moderateScale(24),
    backgroundColor: colors.transparent,
    ...styles.flexRow,
    ...styles.center,
  },
  likeCommentBg: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.iconBg,
    ...styles.center,
    ...styles.mv10,
    ...styles.selfCenter,
  },
  lineView: {
    height: moderateScale(30),
    width: moderateScale(5),
    borderRadius: moderateScale(24),
    backgroundColor: colors.iconBg,
    ...styles.mh5,
  },
  postText: {
    width: getWidth(247),
  },
});
