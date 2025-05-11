import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import FHeader from '../../../components/common/FHeader';
import strings from '../../../i18n/strings';
import FText from '../../../components/common/FText';
import {MakePartnersData, UserDetails} from '../../../api/constant';
import {moderateScale} from '../../../common/constants';
import {StackNav} from '../../../navigation/navigationKey';

export default function MessageScreen({navigation}) {
  const renderMatchesPhotos = ({item, index}) => {
    return (
      <View style={localStyle.imageContainer}>
        <Image source={item.image} style={localStyle.userMatchesImage} />
      </View>
    );
  };
  const onPressMessageChat = item => {
    navigation.navigate(StackNav.Chat, {item: item});
  };
  const messageData = ({item, index}) => {
    return (
      <View style={localStyle.messageRoot}>
        <TouchableOpacity
          style={localStyle.messageContainer}
          onPress={() => onPressMessageChat(item)}>
          <View style={localStyle.imageAndText}>
            <Image source={item.image} style={localStyle.userImage} />
            <View style={localStyle.userNameAndMessageRoot}>
              <FText type={'S18'}>{item.messageUserName}</FText>
              <FText type={'r14'} style={localStyle.messageText}>
                {item.message}{' '}
              </FText>
            </View>
          </View>
          <View>
            {item.unRead === true ? (
              <View style={localStyle.unreadDot} />
            ) : null}
            <FText type={'M14'} color={colors.grayScale400}>
              {item.time}
            </FText>
          </View>
        </TouchableOpacity>
        <View style={localStyle.lineView} />
      </View>
    );
  };
  return (
    <FSafeAreaView style={localStyle.mainScreenView}>
      <FHeader
        color={colors.white}
        title={strings.message}
        textColor={colors.white}
      />
      <ScrollView
        style={localStyle.root}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <FText
            type={'S18'}
            color={colors.white}
            style={localStyle.recentMatchesText}>
            {strings.recentMatches}
          </FText>
          <FlatList
            data={MakePartnersData()}
            renderItem={renderMatchesPhotos}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pr20}
          />
        </View>
        <View style={localStyle.messageMainRoot}>
          <FlatList
            data={UserDetails}
            renderItem={messageData}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mt10}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainScreenView: {
    backgroundColor: colors.primary,
  },
  root: {
    ...styles.flex,
    paddingBottom: moderateScale(70),
  },
  recentMatchesText: {
    ...styles.ph20,
  },
  imageContainer: {
    ...styles.ml15,
  },

  userMatchesImage: {
    width: moderateScale(84),
    height: moderateScale(90),
    borderRadius: moderateScale(14),
    ...styles.mv10,
  },
  messageContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  messageMainRoot: {
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    backgroundColor: colors.white,
    height: '100%',
    ...styles.mt20,
    paddingBottom: moderateScale(60),
    ...styles.flex,
  },
  userImage: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
  },
  userNameAndMessageRoot: {
    ...styles.ml10,
  },
  imageAndText: {
    ...styles.rowCenter,
  },
  messageText: {
    ...styles.mt5,
  },
  unreadDot: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: colors.secondary1,
    marginVertical: moderateScale(6),
  },
  messageRoot: {
    ...styles.ph20,
  },
  lineView: {
    height: moderateScale(1),
    width: '100%',
    backgroundColor: colors.grayScale200,
    ...styles.mv5,
  },
});
