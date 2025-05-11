import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import FHeader from '../../../components/common/FHeader';
import {colors, styles} from '../../../themes';
import FText from '../../../components/common/FText';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import FButton from '../../../components/common/FButton';
import {CameraIcon, SmileyEmojiIcon} from '../../../assets/svg';
import {
  USER_DATA,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {AddPhotoData, AddPhotosData, InterestData} from '../../../api/constant';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {validName} from '../../../utils/Validation';
import FInput from '../../../components/common/FInput';
import {
  getAsyncStorageData,
  setAsyncStorageData,
} from '../../../utils/AsyncStorage';

export default function EditProfile() {
  const navigation = useNavigation();

  const userDetails = async () => {
    const data = await getAsyncStorageData(USER_DATA);
    setSelectImage(data?.userImage);
    setFullName(data?.userName);
    setSelectedDate(data?.birthDate);
    setMyInterest(data?.interest);
    setGender(data?.gender);
  };

  useEffect(() => {
    userDetails();
  }, []);

  const [addImage, setAddImage] = useState([
    {id: 1, image: {}},
    {id: 2, image: {}},
    {id: 3, image: {}},
    {id: 4, image: {}},
    {id: 5, image: {}},
  ]);
  const [selectImage, setSelectImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [myInterest, setMyInterest] = useState(InterestData);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');

  const onChangeName = text => {
    const {msg} = validName(text);
    setFullName(text);
    setFullNameError(msg);
    return false;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onChangeLocation = text => {
    setLocation(text);
  };
  const onChangeGender = text => {
    setGender(text);
  };
  const handleConfirm = date => {
    var expiryDate = date.toISOString().split('T')[0];
    const day = expiryDate.split('-')[2];
    const month = expiryDate.split('-')[1];
    const year = expiryDate.split('-')[0];
    setSelectedDate(day + '/' + month + '/' + year);

    hideDatePicker();
  };

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

  const onPressClose = val => {
    setMyInterest(myInterest.filter(item => item !== val));
  };

  const MyInterest = ({item, index}) => {
    return (
      <View style={localStyle.myInterestContainer}>
        <FText type={'M16'}>{item}</FText>
        <TouchableOpacity onPress={() => onPressClose(item)}>
          <Icons
            name={'close'}
            size={moderateScale(18)}
            color={colors.grayScale400}
            style={styles.mt5}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        <Icons
          name={'information-circle'}
          size={moderateScale(24)}
          color={colors.grayScale200}
        />
      </TouchableOpacity>
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
      setSelectImage(images?.path);
    });
  };

  const onPressSaveChanges = async () => {
    const userData = {
      userName: fullName,
      birthDate: selectedDate,
      gender: gender,
      interest: myInterest,
      userImage: selectImage,
    };
    await setAsyncStorageData(USER_DATA, userData);
    navigation.goBack();
  };

  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader title={strings.editProfile} />
      <KeyBoardAvoidWrapper containerStyle={localStyle.mainContainer}>
        <View style={localStyle.userImageAndAddImage}>
          <ImageBackground
            source={selectImage ? {uri: selectImage} : images.UserProfileImage}
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
            {(AddPhotoData || []).map((item, index) => {
              return <AddPhotos item={item} key={item.id} index={index} />;
            })}
          </View>
        </View>
        <View style={localStyle.bottomAddContainer}>
          {(AddPhotosData || []).map((item, index) => {
            return <AddPhotos item={item} key={item.id} index={index} />;
          })}
        </View>
        <FText
          type={'M14'}
          color={colors.grayScale400}
          style={localStyle.personalDtlsText}>
          {strings.personalDetails}
        </FText>
        <FInput
          placeholder={fullName ? fullName : strings.fullName}
          _value={fullName}
          keyBoardType={'default'}
          _errorText={fullNameError}
          maxLength={30}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangeName}
          label={strings.fullName}
          labelTextColor={colors.black}
        />
        <View>
          <FText type={'R16'} style={localStyle.labelContainer}>
            {strings.birthDate}
          </FText>
          <TouchableOpacity
            style={localStyle.datePikerStyle}
            onPress={showDatePicker}>
            <FText
              type={'M16'}
              color={selectedDate ? colors.black : colors.grayScale400}
              style={styles.ml5}>
              {selectedDate ? selectedDate : strings.birthDate}
            </FText>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
              date={new Date()}
              maximumDate={new Date()}
            />
          </TouchableOpacity>
        </View>
        <FText type={'R16'} style={localStyle.labelContainer}>
          {strings.about}
        </FText>
        <TouchableOpacity style={localStyle.aboutContainer}>
          <FText type={'M16'}>{strings.aboutText}</FText>
          <FText
            type={'M12'}
            color={colors.secondary1}
            style={localStyle.numberText}>
            {'71'}
            <FText color={colors.grayScale400}>{'/250'}</FText>
          </FText>
        </TouchableOpacity>
        <View style={localStyle.myInterestHeader}>
          <FText type={'M16'}>{strings.myInterests}</FText>
          <TouchableOpacity>
            <FText type={'M16'} color={colors.secondary1}>
              {strings.edit}
            </FText>
          </TouchableOpacity>
        </View>
        <View style={localStyle.interestRoot}>
          {(myInterest || []).map((item, index) => {
            return <MyInterest item={item} />;
          })}
        </View>

        <FInput
          placeholder={strings.location}
          _value={location}
          keyBoardType={'default'}
          maxLength={30}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangeLocation}
          label={strings.location}
          labelTextColor={colors.black}
        />
        <FInput
          placeholder={strings.gender}
          _value={gender}
          keyBoardType={'default'}
          maxLength={30}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangeGender}
          label={strings.gender}
          labelTextColor={colors.black}
          rightAccessory={() => <RightIcon />}
        />
        <FButton title={strings.saveChanges} onPress={onPressSaveChanges} />
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainBgContainer: {
    ...styles.flexGrow1,
    backgroundColor: null,
  },
  mainContainer: {
    ...styles.ph20,
    ...styles.flexGrow1,
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
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
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
  personalDtlsText: {
    ...styles.mv10,
  },
  labelContainer: {
    ...styles.mt15,
  },
  datePikerStyle: {
    backgroundColor: colors.white,
    width: '100%',
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
    height: getHeight(52),
    ...styles.mt5,
    ...styles.ph10,
    ...styles.pv15,
  },
  aboutContainer: {
    backgroundColor: colors.white,
    width: '100%',
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
    ...styles.mt5,
    ...styles.p15,
  },
  numberText: {
    ...styles.selfEnd,
  },
  myInterestHeader: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  myInterestContainer: {
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    ...styles.p10,
    ...styles.mv5,
    ...styles.rowCenter,
    ...styles.mh5,
  },
  interestRoot: {
    ...styles.flexRow,
    ...styles.wrap,
  },
});
