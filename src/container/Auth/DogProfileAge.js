import {StyleSheet, TouchableOpacity, View, Modal, FlatList} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {AuthNav} from '../../navigation/navigationKey';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import StepIndicator from '../../components/Home/StepIndicator';
import {getHeight, moderateScale} from '../../common/constants';

export default function DogProfileAge({navigation, route}) {
  const userData = route?.params;

  const [selectedAge, setSelectedAge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Generate ages from 0-20
  const ages = Array.from({length: 21}, (_, i) => i);

  const onPressNext = async () => {
    if (selectedAge === null) {
      alert(strings.pleaseSelectDogAge);
    } else {
      navigation.navigate(AuthNav.DogProfileGender, {
        ...userData,
        dogBirthDate: selectedAge,
      });
    }
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
        {item === 0 ? "Less than 1 year" : item === 1 ? "1 year" : `${item} years`}
      </FText>
      {selectedAge === item && (
        <Ionicons
          name="checkmark"
          size={moderateScale(20)}
          color={colors.secondary1}
        />
      )}
    </TouchableOpacity>
  );

  const getDisplayText = () => {
    if (selectedAge === null) return 'Select your dog\'s age';
    if (selectedAge === 0) return "Less than 1 year";
    if (selectedAge === 1) return "1 year old";
    return `${selectedAge} years old`;
  };

  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.howOldIsYourDog}
            </FText>
            <TouchableOpacity
              style={[
                localStyle.dropdownButton,
                {
                  borderColor: selectedAge !== null ? colors.secondary1 : colors.white,
                },
              ]}
              onPress={() => setModalVisible(true)}>
              <FText
                type={'M16'}
                color={selectedAge !== null ? colors.black : colors.grayScale400}
                style={[{ flex: 1, paddingLeft: 10 }]}
                numberOfLines={1}>
                {getDisplayText()}
              </FText>
              <Ionicons
                name="chevron-down-outline"
                size={moderateScale(20)}
                color={colors.primary}
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <StepIndicator step={2} rightIcon onPressNext={onPressNext} totalSteps={9} />
          </View>
          
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
                    Select Your Dog's Age
                  </FText>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons
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
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
    ...styles.justifyBetween,
    ...styles.flex,
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
    ...styles.mt20,
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