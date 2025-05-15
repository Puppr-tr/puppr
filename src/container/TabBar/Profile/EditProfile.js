import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
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
    setSelectedAge(data?.birthDate);
    setMyInterest(data?.interest);
    setGender(data?.gender);
  };

  useEffect(() => {
    userDetails();
  }, []);

  // Generate ages from 18-99
  const ages = Array.from({length: 82}, (_, i) => i + 18);

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
  const [selectedAge, setSelectedAge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [myInterest, setMyInterest] = useState(InterestData);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');

  const onChangeName = text => {
    const {msg} = validName(text);
    setFullName(text);
    setFullNameError(msg);
    return false;
  };

  const selectAge = (age) => {
    setSelectedAge(age);
    setModalVisible(false);
  };

  const renderAgeItem = ({item}) => (
    <TouchableOpacity 
      style={localStyle.ageItem}
      onPress={() => selectAge(item)}>
      <FText 
        type={'M16'} 
        color={colors.black}>
        {item}
      </FText>
      {selectedAge === item && (
        <Icons
          name="checkmark"
          size={moderateScale(20)}
          color={colors.secondary1}
        />
      )}
    </TouchableOpacity>
  );

  const onChangeLocation = text => {
    setLocation(text);
  };
  const onChangeGender = text => {
    setGender(text);
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
      birthDate: selectedAge,
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
            {strings.age}
          </FText>
          <TouchableOpacity
            style={localStyle.dropdownButton}
            onPress={() => setModalVisible(true)}>
            <FText
              type={'M16'}
              color={selectedAge ? colors.black : colors.grayScale400}
              style={[{ flex: 1, paddingLeft: 10 }]}
              numberOfLines={1}>
              {selectedAge ? `${selectedAge} years old` : 'Select your age'}
            </FText>
            <Icons
              name="chevron-down-outline"
              size={moderateScale(20)}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          
          {/* Age Picker Modal */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}>
            <View style={localStyle.modalOverlay}>
              <View style={localStyle.modalContent}>
                <View style={localStyle.modalHeader}>
                  <FText type={'B18'} color={colors.primary}>
                    Select Your Age
                  </FText>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icons
                      name="close"
                      size={moderateScale(24)}
                      color={colors.grayScale500}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={ages}
                  renderItem={renderAgeItem}
                  keyExtractor={(item) => item.toString()}
                  showsVerticalScrollIndicator={true}
                  style={localStyle.ageList}
                />
              </View>
            </View>
          </Modal>
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
        <View style={localStyle.myInterestContainer}>
          <FText type={'R16'} style={localStyle.labelContainer}>
            {strings.myInterests}
          </FText>
          <View>
            <TouchableOpacity>
              <FText type={'B16'} color={colors.primary}>
                {strings.edit}
              </FText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={localStyle.interestFoodContainer}>
          {(myInterest || []).map((item, index) => {
            return <MyInterest item={item} key={index} />;
          })}
        </View>
        <FButton
          onPress={onPressSaveChanges}
          title={strings.saveChanges}
          containerStyle={localStyle.containerBtnStyle}
        />
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainBgContainer: {
    ...styles.flexGrow1,
  },
  mainContainer: {
    ...styles.ph20,
  },
  userImage: {
    width: getWidth(180),
    height: getHeight(250),
    ...styles.center,
    backgroundColor: colors.primary50,
    overflow: 'hidden',
  },
  userImageAndAddImage: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
  },
  addPhotoContainer: {
    width: getWidth(150),
    height: getHeight(72),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary50,
    ...styles.center,
    ...styles.mv10,
  },
  addTextContainer: {
    ...styles.rowCenter,
    ...styles.mt5,
    ...styles.ph10,
    ...styles.pv5,
    backgroundColor: colors.secondary1,
    borderRadius: moderateScale(16),
  },
  changePhotoContainer: {
    ...styles.flexRow,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    ...styles.ph10,
    ...styles.pv5,
    position: 'absolute',
    bottom: 0,
    ...styles.rowCenter,
  },
  changePhotoText: {
    ...styles.ml10,
  },
  bottomAddContainer: {
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.justifyBetween,
  },
  personalDtlsText: {
    ...styles.mt20,
  },
  aboutContainer: {
    ...styles.rowSpaceBetween,
    backgroundColor: colors.inputBg,
    height: getHeight(110),
    borderRadius: moderateScale(12),
    ...styles.p10,
  },
  numberText: {
    alignSelf: 'flex-end',
  },
  labelContainer: {
    ...styles.mt10,
  },
  dropdownButton: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv18,
    borderWidth: moderateScale(1),
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(16),
    backgroundColor: colors.white,
    width: '100%',
    ...styles.selfCenter,
    height: getHeight(60),
    ...styles.mt10,
  },
  myInterestContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flexRow,
    ...styles.mt10,
  },
  interestFoodContainer: {
    ...styles.flexRow,
    ...styles.wrap,
  },
  myInterestContainer: {
    ...styles.flexRow,
    ...styles.rowSpaceBetween,
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(1),
    ...styles.p10,
    ...styles.mv5,
    ...styles.mh5,
  },
  containerBtnStyle: {
    ...styles.mv30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    width: '90%',
    maxHeight: '70%',
    borderRadius: moderateScale(16),
    ...styles.pt10,
    ...styles.pb20,
  },
  modalHeader: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayScale200,
  },
  ageList: {
    ...styles.mt5,
  },
  ageItem: {
    ...styles.ph20,
    ...styles.pv15,
    ...styles.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayScale100,
  },
});
