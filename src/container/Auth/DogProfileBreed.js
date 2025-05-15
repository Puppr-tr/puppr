import {StyleSheet, TouchableOpacity, View, Modal, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {DogBreedData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileBreed({navigation, route}) {
  const userData = route?.params;

  const [selectedBreed, setSelectedBreed] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState(DogBreedData);
  
  useEffect(() => {
    if (searchText) {
      const filtered = DogBreedData.filter(breed => 
        breed.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBreeds(filtered);
    } else {
      setFilteredBreeds(DogBreedData);
    }
  }, [searchText]);
  
  const onPressBreed = value => {
    setSelectedBreed(value);
    setModalVisible(false);
    setSearchText('');
  };
  
  const onPressNext = () => {
    if (selectedBreed === '') {
      alert(strings.pleaseSelectDogBreed);
    } else {
      navigation.navigate(AuthNav.DogProfileNature, {
        ...userData,
        dogBreed: selectedBreed,
      });
    }
  };

  const clearSearch = () => {
    setSearchText('');
  };
  
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectYourDogBreed}
          </FText>
          
          <TouchableOpacity 
            style={localStyle.dropdownButton}
            onPress={() => setModalVisible(true)}>
            <FText 
              type={'M16'} 
              color={selectedBreed ? colors.primary : colors.grayScale400}>
              {selectedBreed || strings.selectBreed}
            </FText>
            <Ionicons
              name="chevron-down-outline"
              size={moderateScale(20)}
              color={colors.primary}
            />
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={localStyle.modalOverlay}>
              <View style={localStyle.modalContent}>
                <View style={localStyle.modalHeader}>
                  <FText type={'B18'} color={colors.primary}>
                    {strings.selectYourDogBreed}
                  </FText>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons
                      name="close-outline"
                      size={moderateScale(24)}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Search Input */}
                <View style={localStyle.searchContainer}>
                  <Ionicons
                    name="search-outline"
                    size={moderateScale(20)}
                    color={colors.white}
                    style={localStyle.searchIcon}
                  />
                  <TextInput
                    style={localStyle.searchInput}
                    placeholder="Search breeds..."
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={searchText}
                    onChangeText={setSearchText}
                  />
                  {searchText ? (
                    <TouchableOpacity onPress={clearSearch}>
                      <Ionicons
                        name="close-circle"
                        size={moderateScale(20)}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                
                <ScrollView style={localStyle.breedList}>
                  {filteredBreeds.length > 0 ? (
                    filteredBreeds.map((breed, index) => (
                      <TouchableOpacity
                        key={index}
                        style={localStyle.breedItem}
                        onPress={() => onPressBreed(breed)}>
                        <FText
                          type={'M16'}
                          color={selectedBreed === breed ? colors.secondary1 : colors.primary}>
                          {breed}
                        </FText>
                        {selectedBreed === breed && (
                          <Ionicons
                            name="checkmark"
                            size={moderateScale(20)}
                            color={colors.secondary1}
                          />
                        )}
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={localStyle.noResultsContainer}>
                      <FText type={'M16'} color={colors.grayScale400} align={'center'}>
                        No breeds found
                      </FText>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        <StepIndicator step={4} rightIcon onPressNext={onPressNext} totalSteps={9} />
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
  dropdownButton: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    borderWidth: moderateScale(2),
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(12),
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
  searchContainer: {
    ...styles.rowCenter,
    ...styles.ph15,
    ...styles.mv10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: moderateScale(10),
    backgroundColor: '#1c3f21', // Dark forest green
    height: moderateScale(42),
    ...styles.mh15,
  },
  searchIcon: {
    ...styles.mr10,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: moderateScale(16),
    padding: 0,
    height: '100%',
  },
  breedList: {
    ...styles.mt5,
  },
  breedItem: {
    ...styles.ph20,
    ...styles.pv15,
    ...styles.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayScale100,
  },
  noResultsContainer: {
    ...styles.pv30,
    ...styles.ph20,
  },
  bottomContainer: {
    ...styles.mb15,
  },
  stepText: {
    ...styles.mb5,
  }
}); 