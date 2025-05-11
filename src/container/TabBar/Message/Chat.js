import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import FHeader from '../../../components/common/FHeader';
import strings from '../../../i18n/strings';
import {
  checkPlatform,
  deviceWidth,
  moderateScale,
} from '../../../common/constants';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {ChatData} from '../../../api/constant';
import FText from '../../../components/common/FText';
import FInput from '../../../components/common/FInput';

export default function Chat({route}) {
  let item = route?.params?.item;
  const [chatMessage, setChatMessage] = useState('');

  const onChangeMessageField = text => {
    setChatMessage(text);
  };
  const RightIcon = () => {
    return (
      <TouchableOpacity style={localStyle.iconBg}>
        <Ionicons
          name={'ellipsis-horizontal'}
          size={moderateScale(22)}
          color={colors.white}
        />
      </TouchableOpacity>
    );
  };

  const LeftIcon = () => {
    return (
      <TouchableOpacity style={localStyle.leftIconStyle}>
        <Icons
          name={'paperclip'}
          size={moderateScale(24)}
          color={colors.selectBorder}
        />
      </TouchableOpacity>
    );
  };

  const RightMessengerIcon = () => {
    return (
      <TouchableOpacity style={localStyle.rightIconStyle}>
        <Icons name={'mic'} size={moderateScale(24)} color={colors.white} />
      </TouchableOpacity>
    );
  };
  const senderMessage = ({item, index}) => {
    return (
      <View>
        {item.time ? (
          <FText
            color={colors.grayScale400}
            style={styles.mv15}
            type={'M14'}
            align={'center'}>
            {item.time}
          </FText>
        ) : null}
        <View
          style={[
            localStyle.senderContainer,
            item.type == 'sender' && {
              borderBottomLeftRadius: moderateScale(24),
            },
            item.type !== 'sender' && {
              borderBottomRightRadius: moderateScale(24),
            },
            {
              borderTopLeftRadius: moderateScale(24),
              borderTopRightRadius: moderateScale(24),
              backgroundColor:
                item.type == 'sender' ? colors.secondary1 : colors.btnBg,
              alignSelf: item.type == 'sender' ? 'flex-end' : 'flex-start',
            },
          ]}>
          <FText color={colors.white} type="M16">
            {item.message}
          </FText>
        </View>
      </View>
    );
  };

  return (
    <FSafeAreaView style={localStyle.bgContainer}>
      <FHeader
        color={colors.white}
        title={item.messageUserName}
        textColor={colors.white}
        rightIcon={<RightIcon />}
      />
      <KeyBoardAvoidWrapper
        keyboardVerticalOffset={
          checkPlatform() === 'ios' ? moderateScale(120) : null
        }
        contentContainerStyle={localStyle.root}
        behavior={checkPlatform() === 'ios' ? 'padding' : null}>
        <View style={styles.flex}>
          <FlatList
            data={ChatData}
            renderItem={senderMessage}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <FInput
          containerStyle={styles.mb10}
          placeholder={strings.message}
          keyboardType={'default'}
          value={chatMessage}
          onChangeText={onChangeMessageField}
          autoCapitalize={'none'}
          insideLeftIcon={() => <LeftIcon />}
          rightAccessory={() => <RightMessengerIcon />}
          inputContainerStyle={localStyle.messengerContainer}
        />
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  bgContainer: {
    backgroundColor: colors.primary,
  },
  iconBg: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
    ...styles.center,
  },
  senderContainer: {
    ...styles.ph20,
    ...styles.pv10,
    maxWidth: '60%',
    ...styles.mt20,
  },
  root: {
    ...styles.justifySpaceBetween,
    ...styles.ph10,
    ...styles.flex,
  },
  rightIconStyle: {
    backgroundColor: colors.secondary1,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    ...styles.center,
  },
  messengerContainer: {
    borderRadius: moderateScale(80),
    width: deviceWidth - moderateScale(40),
  },
});
