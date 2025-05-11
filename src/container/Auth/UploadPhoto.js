import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {
  USER_DATA,
  getHeight,
  getWidth,
  moderateScale,
} from '../../common/constants';
import {AddPhotoData, AddPhotosData} from '../../api/constant';
import {CameraIcon, SmileyEmojiIcon} from '../../assets/svg';
import StepIndicator from '../../components/Home/StepIndicator';
import FButton from '../../components/common/FButton';
import VerifiedModal from '../../components/modal/VerifiedModal';
import {StackNav, TabNav} from '../../navigation/navigationKey';
import {setAsyncStorageData, setAuthToken} from '../../utils/AsyncStorage';

export default function UploadPhoto({navigation, route}) {
  const {userName, mobileNo, birthDate, gender, interest} = route?.params;

  const [addImage, setAddImage] = useState([
    {id: 1, image: {}},
    {id: 2, image: {}},
    {id: 3, image: {}},
    {id: 4, image: {}},
    {id: 5, image: {}},
  ]);
  const [selectImage, setSelectImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const AddPhotos = ({item, index}) => {
    return (
      <View>
        {addImage ? (
          <View style={localStyle.addPhotoContainer}>
            <SmileyEmojiIcon />
            <TouchableOpacity
              style={localStyle.addTextContainer}
              onPress={() => onPressGallery(item, index)}>
              <Ionicons
                name={'plus'}
                size={moderateScale(16)}
                color={colors.white}
              />
              <FText type={'S14'} color={colors.white}>
                {strings.add}
              </FText>
            </TouchableOpacity>
          </View>
        ) : (
          <Image source={{uri: addImage}} />
        )}
      </View>
    );
  };

  const onPressGallery = (itm, idx) => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      let tmpVar = [...addImage];
      tmpVar[idx].image.uri = `${image.path}`;
      tmpVar[idx].image.name = `${image.path.substring(
        image.path.lastIndexOf('/') + 1,
      )}`;

      tmpVar[idx].image.type = `${image.mime}`;
      setAddImage(tmpVar);
    });
  };

  const onPressChangePhoto = (itm, idx) => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
    }).then(images => {
      setSelectImage(images.path);
    });
  };

  const onPressNext = async () => {
    setModalVisible(true);
  };

  const onPressGetStarted = async () => {
    await setAuthToken(true);
    setModalVisible(false);
    const userData = {
      userName: userName,
      mobileNo: mobileNo,
      birthDate: birthDate,
      gender: gender,
      interest: interest,
      userImage: selectImage,
    };
    await setAsyncStorageData(USER_DATA, userData);
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabNavigation, userData: userData}],
    });
  };
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.uploadYourPhotos}
          </FText>
          <View style={localStyle.userImageAndAddImage}>
            <ImageBackground
              source={
                selectImage ? {uri: selectImage} : images.UserProfileImage
              }
              style={[
                localStyle.userImage,
                {
                  borderRadius: moderateScale(12),
                },
              ]}>
              <TouchableOpacity
                style={localStyle.changePhotoContainer}
                onPress={() => onPressChangePhoto()}>
                <CameraIcon />
                <FText
                  type={'S14'}
                  color={colors.white}
                  style={localStyle.changePhotoText}>
                  {strings.changePhoto}
                </FText>
              </TouchableOpacity>
            </ImageBackground>
            <View>
              {AddPhotoData.map((item, index) => {
                return <AddPhotos item={item} key={item.id} index={index} />;
              })}
            </View>
          </View>
          <View style={localStyle.bottomAddContainer}>
            {AddPhotosData.map((item, index) => {
              return <AddPhotos item={item} key={item.id} index={index} />;
            })}
          </View>
          <FButton title={strings.next} onPress={onPressNext} />
        </View>
        <StepIndicator step={5} />
        <VerifiedModal
          visible={modalVisible}
          onPressStarted={onPressGetStarted}
        />
      </View>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainBgContainer: {
    ...styles.flexGrow1,
  },
  mainContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
  },
  userImage: {
    width: getWidth(215),
    height: getHeight(215),
    ...styles.mr5,
  },
  addPhotoContainer: {
    width: getWidth(100),
    height: getHeight(102),
    borderRadius: moderateScale(16),
    ...styles.center,
    backgroundColor: colors.white,
    ...styles.mh5,
    ...styles.mv5,
  },
  addTextContainer: {
    height: moderateScale(24),
    ...styles.flexRow,
    ...styles.center,
    borderRadius: moderateScale(32),
    backgroundColor: colors.secondary1,
    width: moderateScale(62),
    ...styles.mt5,
  },
  userImageAndAddImage: {
    ...styles.flexRow,
    ...styles.mt20,
  },
  bottomAddContainer: {
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.mt10,
  },
  changePhotoContainer: {
    width: moderateScale(140),
    height: moderateScale(36),
    borderRadius: moderateScale(32),
    ...styles.rowCenter,
    backgroundColor: colors.transparent,
    position: 'absolute',
    bottom: moderateScale(10),
    ...styles.selfCenter,
  },
  changePhotoText: {
    ...styles.ml5,
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
});
