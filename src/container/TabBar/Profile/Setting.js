import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import {colors, styles} from '../../../themes';
import FHeader from '../../../components/common/FHeader';
import strings from '../../../i18n/strings';
import FText from '../../../components/common/FText';
import {
  ACCESS_TOKEN,
  deviceWidth,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import SliderComponents from '../../../components/Home/SliderComponents';
import {PrivacyData} from '../../../api/constant';
import {StackNav} from '../../../navigation/navigationKey';
import {removeAsyncStorageData} from '../../../utils/AsyncStorage';
import LogOutModal from '../../../components/modal/LogOutModal';

export default function Setting({navigation}) {
  const [value, setValue] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeValue = newValue => {
    setValue(newValue);
  };
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const onPressLogOut = () => {
    setIsModalVisible(true);
  };

  const onPressCancel = () => {
    setIsModalVisible(false);
  };

  const onPressLgOut = async () => {
    try {
      setIsModalVisible(false);
      await removeAsyncStorageData(ACCESS_TOKEN);
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.AuthNavigation}],
        });
      }, 500);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const categories = ({item, index}) => {
    return (
      <TouchableOpacity style={localStyle.settingDataContainer} key={index}>
        <View>
          <FText type={'M16'} style={localStyle.titleText}>
            {item.title}
          </FText>
          {item?.desc ? (
            <FText type={'M12'} color={colors.grayScale400}>
              {item.desc}
            </FText>
          ) : null}
        </View>
        <Ionicons
          name={'chevron-forward-outline'}
          color={colors.grayScale400}
          size={moderateScale(24)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FSafeAreaView style={localStyle.mainScreenView}>
      <FHeader title={strings.setting} />
      <ScrollView
        style={localStyle.root}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <FText type={'M16'} color={colors.grayScale400}>
          {strings.discoverySettings}
        </FText>
        <View style={localStyle.locationContainer}>
          <FText type={'M18'}>{strings.location}</FText>
          <View style={localStyle.countryNameContainer}>
            <FText type={'M14'} color={colors.grayScale400}>
              {strings.hamburgGermany}
            </FText>
            <Ionicons
              name={'chevron-forward-outline'}
              color={colors.grayScale400}
              size={moderateScale(20)}
            />
          </View>
        </View>
        <View style={localStyle.distanceContainer}>
          <View style={localStyle.distanceHeader}>
            <FText type={'M16'}>{strings.distancePreference}</FText>
            <FText type={'M16'} color={colors.secondary1}>
              {'100 Km'}
            </FText>
          </View>
          <SliderComponents
            endPoint={10}
            maxValue={100}
            onValuesChange={onChangeValue}
            width={getWidth(285)}
          />
          <View style={localStyle.lineView} />
          <View style={localStyle.switchAndShowPeople}>
            <FText type={'R14'} color={colors.grayScale400}>
              {strings.onlyShowPeopleInThisRange}
            </FText>
            <Switch
              trackColor={{
                true: colors.secondary1,
              }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <FText type={'M16'} color={colors.grayScale400}>
          {strings.privacy}
        </FText>
        <FlatList
          data={PrivacyData}
          renderItem={categories}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={onPressLogOut}>
          <FText
            type={'B18'}
            align={'center'}
            color={colors.alertColor}
            style={localStyle.logOutText}>
            {strings.logOut}
          </FText>
        </TouchableOpacity>
        <FText
          type={'M14'}
          align={'center'}
          color={colors.grayScale400}
          style={localStyle.logOutText}>
          {strings.version}
        </FText>
      </ScrollView>
      <LogOutModal
        visible={isModalVisible}
        onPressLogOut={onPressLgOut}
        onPressCancel={onPressCancel}
      />
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainScreenView: {
    backgroundColor: colors.white,
  },
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
  locationContainer: {
    height: moderateScale(64),
    backgroundColor: colors.white,
    ...styles.ph10,
    ...styles.rowSpaceBetween,
    ...styles.mv10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: moderateScale(16),
    width: deviceWidth - moderateScale(40),
    ...styles.selfCenter,
  },
  countryNameContainer: {
    ...styles.rowCenter,
  },
  distanceContainer: {
    backgroundColor: colors.white,
    ...styles.p15,
    ...styles.mv10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: moderateScale(16),
    width: deviceWidth - moderateScale(40),
    ...styles.selfCenter,
  },
  distanceHeader: {
    ...styles.rowSpaceBetween,
  },
  lineView: {
    height: moderateScale(1),
    width: '100%',
    ...styles.mv10,
    backgroundColor: colors.grayScale200,
  },
  switchAndShowPeople: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
  },
  settingDataContainer: {
    height: moderateScale(64),
    backgroundColor: colors.white,
    ...styles.ph10,
    ...styles.rowSpaceBetween,
    ...styles.mv10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: moderateScale(16),
    width: deviceWidth - moderateScale(50),
    ...styles.selfCenter,
  },

  titleText: {
    ...styles.mv5,
  },
  logOutText: {
    ...styles.mv15,
  },
});
