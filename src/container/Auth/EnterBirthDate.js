import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

// custom import
import FSafeAreaView from '../../components/common/FSafeAreaView';
import FHeader from '../../components/common/FHeader';
import {colors, styles} from '../../themes';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {AuthNav} from '../../navigation/navigationKey';
import FText from '../../components/common/FText';
import strings from '../../i18n/strings';
import StepIndicator from '../../components/Home/StepIndicator';
import {USER_DATA, getHeight, moderateScale} from '../../common/constants';
import {setAsyncStorageData} from '../../utils/AsyncStorage';

export default function EnterBirthDate({navigation, route}) {
  const {userName, mobileNo} = route?.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onPressNext = async () => {
    // if (selectedDate === '') {
    //   alert(strings.pleaseEnterYourBirthDate);
    // } else {
    // }
    navigation.navigate(AuthNav.SelectGender, {
      birthDate: selectedDate,
      userName: userName,
      mobileNo: mobileNo,
    });
  };

  const handleConfirm = date => {
    var expiryDate = date.toISOString().split('T')[0];
    const day = expiryDate.split('-')[2];
    const month = expiryDate.split('-')[1];
    const year = expiryDate.split('-')[0];
    setSelectedDate(day + '/' + month + '/' + year);

    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <FSafeAreaView>
      <FHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyle.mainContainer}>
          <View>
            <FText type={'B24'} color={colors.primary} align={'center'}>
              {strings.whenIsYourBirthday}
            </FText>
            <TouchableOpacity
              style={[
                localStyle.datePikerStyle,
                {
                  borderColor: selectedDate ? colors.secondary1 : colors.white,
                },
              ]}
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
          <View>
            <StepIndicator step={2} rightIcon onPressNext={onPressNext} />
          </View>
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
  datePikerStyle: {
    backgroundColor: colors.white,
    width: '100%',
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
    height: getHeight(52),
    ...styles.mt20,
    ...styles.ph10,
    ...styles.pv15,
    borderWidth: moderateScale(1),
  },
});
