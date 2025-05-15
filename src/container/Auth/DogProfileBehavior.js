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
import {DogBehaviorData} from '../../api/constant';
import StepIndicator from '../../components/Home/StepIndicator';
import {AuthNav} from '../../navigation/navigationKey';

export default function DogProfileBehavior({navigation, route}) {
  const userData = route?.params;

  const [selectedBehaviors, setSelectedBehaviors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredBehaviors, setFilteredBehaviors] = useState(DogBehaviorData);
  
  useEffect(() => {
    if (searchText) {
      const filtered = DogBehaviorData.filter(behavior => 
        behavior.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBehaviors(filtered);
    } else {
      setFilteredBehaviors(DogBehaviorData);
    }
  }, [searchText]);
  
  const onPressBehavior = value => {
    if (selectedBehaviors.includes(value)) {
      setSelectedBehaviors(selectedBehaviors.filter(item => item !== value));
    } else {
      setSelectedBehaviors([...selectedBehaviors, value]);
    }
  };
  
  const onPressNext = () => {
    // No validation needed - allow proceeding with zero traits
    navigation.navigate(AuthNav.DogProfileSize, {
      ...userData,
      dogBehavior: selectedBehaviors,
    });
  };

  const clearSearch = () => {
    setSearchText('');
  };
  
  const displayBehaviors = () => {
    if (selectedBehaviors.length === 0) {
      return "No behavioral issues (optional)";
    } else if (selectedBehaviors.length === 1) {
      return selectedBehaviors[0];
    } else {
      return `${selectedBehaviors.length} behavioral traits selected`;
    }
  };
  
  return (
    <FSafeAreaView style={localStyle.mainBgContainer}>
      <FHeader />
      <View style={localStyle.mainContainer}>
        <View style={styles.flex}>
          <FText type={'B24'} color={colors.primary} align={'center'}>
            {strings.selectDogBehavior}
          </FText>
          
          <View style={localStyle.optionalTextContainer}>
            <FText type={'M16'} color={colors.grayScale500} align={'center'}>
              Select any that apply, or leave empty if none apply
            </FText>
          </View>
          
          <TouchableOpacity 
            style={localStyle.dropdownButton}
            onPress={() => setModalVisible(true)}>
            <FText 
              type={'M16'} 
              color={selectedBehaviors.length > 0 ? colors.primary : colors.grayScale400}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{flex: 1}}>
              {displayBehaviors()}
            </FText>
            <Ionicons
              name="chevron-down-outline"
              size={moderateScale(20)}
              color={colors.primary}
            />
          </TouchableOpacity>
          
          {selectedBehaviors.length > 0 && (
            <View style={localStyle.selectedContainer}>
              <FText type={'B16'} color={colors.primary} style={localStyle.selectedTitle}>
                Selected traits:
              </FText>
              <ScrollView style={localStyle.selectedScrollView}>
                {selectedBehaviors.map((behavior, index) => (
                  <View key={index} style={localStyle.selectedBehavior}>
                    <FText type={'M14'} color={colors.primary}>
                      {behavior}
                    </FText>
                    <TouchableOpacity onPress={() => onPressBehavior(behavior)}>
                      <Ionicons
                        name="close-circle"
                        size={moderateScale(20)}
                        color={colors.secondary1}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

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
                    {strings.selectDogBehavior}
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
                    placeholder="Search behavioral traits..."
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
                
                <ScrollView style={localStyle.behaviorList}>
                  {filteredBehaviors.length > 0 ? (
                    filteredBehaviors.map((behavior, index) => (
                      <TouchableOpacity
                        key={index}
                        style={localStyle.behaviorItem}
                        onPress={() => onPressBehavior(behavior)}>
                        <FText
                          type={'M16'}
                          color={selectedBehaviors.includes(behavior) ? colors.secondary1 : colors.primary}>
                          {behavior}
                        </FText>
                        {selectedBehaviors.includes(behavior) && (
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
                        No behavioral traits found
                      </FText>
                    </View>
                  )}
                </ScrollView>
                
                <View style={localStyle.modalFooter}>
                  <TouchableOpacity 
                    style={localStyle.doneButton}
                    onPress={() => setModalVisible(false)}>
                    <FText type={'B16'} color={colors.white}>
                      Done
                    </FText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <StepIndicator step={6} rightIcon onPressNext={onPressNext} totalSteps={9} />
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
  optionalTextContainer: {
    ...styles.mt10,
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
  selectedContainer: {
    ...styles.mt15,
    ...styles.mb10,
  },
  selectedTitle: {
    ...styles.mb10,
  },
  selectedScrollView: {
    maxHeight: moderateScale(150),
  },
  selectedBehavior: {
    ...styles.rowSpaceBetween,
    ...styles.ph15,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderColor: colors.selectBorder,
    borderRadius: moderateScale(8),
    ...styles.mb10,
    backgroundColor: colors.pinkBg,
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
    backgroundColor: colors.primary,
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
  behaviorList: {
    ...styles.mt5,
  },
  behaviorItem: {
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
  modalFooter: {
    ...styles.mt10,
    ...styles.ph20,
  },
  doneButton: {
    ...styles.center,
    ...styles.pv12,
    backgroundColor: colors.secondary1,
    borderRadius: moderateScale(30),
  },
}); 