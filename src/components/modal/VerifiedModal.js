import {Image, Modal, StyleSheet, View} from 'react-native';
import React from 'react';

// custom import
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import FText from '../common/FText';
import strings from '../../i18n/strings';
import FButton from '../common/FButton';

export default function VerifiedModal(props) {
  let {visible, onPressStarted} = props;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={localStyle.wholeContainer}>
        <View style={localStyle.mainViewContainer}>
          <Image
            source={images.VerifiedSuccessfullyImage}
            style={localStyle.verifiedImage}
          />
          <FText type={'B24'} color={colors.black}>
            {strings.youVerified}
          </FText>
          <FText
            type={'R16'}
            color={colors.grayScale400}
            align={'center'}
            numOfLines={2}>
            {strings.yourAccountIsVerifiedLetStartMakeFriends}
          </FText>
          <FButton
            title={strings.getStarted}
            containerStyle={localStyle.startedBtn}
            onPress={onPressStarted}
          />
        </View>
      </View>
    </Modal>
  );
}

const localStyle = StyleSheet.create({
  mainViewContainer: {
    borderRadius: moderateScale(24),
    ...styles.p20,
    ...styles.center,
    backgroundColor: colors.white,
    width: '90%',
  },
  wholeContainer: {
    backgroundColor: colors.modalBg,
    ...styles.flex,
    ...styles.center,
  },
  verifiedImage: {
    height: moderateScale(140),
    width: moderateScale(140),
    ...styles.mv20,
  },
  startedBtn: {
    width: '100%',
    ...styles.mv25,
  },
});
