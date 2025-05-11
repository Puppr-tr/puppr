import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

// custom import
import {colors, styles} from '../../themes';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {moderateScale} from '../../common/constants';
import FText from '../common/FText';
import FButton from '../common/FButton';

// custom import

export default function LogOutModal(props) {
  let {visible, onPressCancel, onPressLogOut} = props;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={[
          localStyle.mainViewStyle,
          {backgroundColor: colors.modalBackground},
        ]}>
        <View style={localStyle.modalContainer}>
          <Image source={images.LogOutImage} style={localStyle.imageStyle} />
          <FText type={'B18'} align={'center'}>
            {strings.areYouSureWantToLogout}
          </FText>
          <View style={localStyle.btnContainer}>
            <FButton
              title={strings.cancel}
              type={'b16'}
              containerStyle={localStyle.btnStyle}
              onPress={onPressCancel}
              bgColor={colors.secondary1}
            />
            <FButton
              title={strings.logOut}
              type={'b16'}
              containerStyle={localStyle.btnStyle}
              onPress={onPressLogOut}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const localStyle = StyleSheet.create({
  mainViewStyle: {
    ...styles.flex,
    ...styles.center,
  },
  modalContainer: {
    width: '80%',
    borderRadius: moderateScale(16),
    ...styles.ph20,
    ...styles.pv30,
    backgroundColor: colors.white,
  },
  imageStyle: {
    height: moderateScale(120),
    width: moderateScale(120),
    ...styles.mb30,
    ...styles.selfCenter,
  },
  btnStyle: {
    ...styles.selfCenter,
    width: '48%',
    ...styles.mt30,
    ...styles.mb20,
  },
  btnContainer: {
    ...styles.rowSpaceBetween,
  },
});
