import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import FText from '../common/FText';
import strings from '../../i18n/strings';
import SliderComponents from '../Home/SliderComponents';
import FButton from '../common/FButton';

export default function ExploreFilter(props) {
  const {SheetRef} = props;
  const [select, setSelect] = useState(false);
  const [value, setValue] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const onPressApply = () => SheetRef?.current?.hide();
  const onPressSelectItem = item => {
    setSelect(item);
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const onChangeValue = newValue => {
    setValue(newValue);
  };
  const onPressReset = () => SheetRef?.current?.hide();
  const Preferences = ({item, index}) => {
    return (
      <TouchableOpacity
        style={localStyle.makeFrContainer}
        onPress={() => onPressSelectItem(item)}>
        <Ionicons
          name={select === item ? 'checkbox' : 'square-outline'}
          style={localStyle.selectIcon}
          color={select === item ? colors.secondary1 : colors.grayScale200}
          size={moderateScale(24)}
        />
        <FText type={'M16'} color={colors.grayScale400}>
          {item}
        </FText>
      </TouchableOpacity>
    );
  };
  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        width: moderateScale(60),
        ...styles.mv10,
      }}
      containerStyle={localStyle.actionSheetContainer}>
      <FText type={'B24'} align={'center'} style={localStyle.filterText}>
        {strings.filters}
      </FText>
      <View style={localStyle.headerContainer}>
        <FText type={'S18'}>{strings.location}</FText>
        <View style={localStyle.arrowAndPeopleContainer}>
          <FText type={'M16'} color={colors.grayScale400}>
            {strings.peopleNearby}
          </FText>
          <Ionicons
            name={'chevron-forward-outline'}
            size={moderateScale(20)}
            color={colors.grayScale400}
          />
        </View>
      </View>
      <View style={localStyle.lineView} />
      <FText type={'S18'}>{strings.preferences}</FText>
      <View style={localStyle.preferenceView}>
        <Preferences item={strings.makeFriends} />
        <Preferences item={strings.dating} />
      </View>
      <View style={localStyle.lineView} />
      <View style={localStyle.headerContainer}>
        <FText type={'S18'}>{strings.distance}</FText>
        <View>
          <FText type={'S18'} color={colors.secondary1}>
            {'10 km'}
          </FText>
          <View style={localStyle.underlineView} />
        </View>
      </View>
      <SliderComponents
        endPoint={10}
        maxValue={1000}
        onValuesChange={onChangeValue}
      />
      <View style={localStyle.lineView} />
      <View style={localStyle.headerContainer}>
        <FText type={'S18'}>{strings.age}</FText>
        <View>
          <FText type={'S18'} color={colors.secondary1}>
            {'20-25'}
          </FText>
          <View style={localStyle.underlineView} />
        </View>
      </View>
      <SliderComponents
        endPoint={20}
        maxValue={1000}
        onValuesChange={onChangeValue}
        anotherCustom={true}
      />
      <View style={localStyle.lineView} />
      <View style={localStyle.headerContainer}>
        <FText type={'S18'}>{strings.onlineNow}</FText>
        <Switch
          trackColor={{
            true: colors.secondary1,
          }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={localStyle.lineView} />
      <View style={localStyle.headerContainer}>
        <FButton
          bgColor={colors.grayScale100}
          title={strings.reset}
          color={colors.grayScale400}
          containerStyle={localStyle.btnStyle}
          onPress={onPressReset}
        />
        <FButton
          title={strings.apply}
          containerStyle={localStyle.btnStyle}
          onPress={onPressApply}
        />
      </View>
    </ActionSheet>
  );
}

const localStyle = StyleSheet.create({
  actionSheetContainer: {
    ...styles.ph20,
    ...styles.pb30,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
  },
  headerContainer: {
    ...styles.rowSpaceBetween,
  },
  filterText: {
    ...styles.mv10,
  },
  arrowAndPeopleContainer: {
    ...styles.rowCenter,
  },
  lineView: {
    height: moderateScale(1),
    width: '100%',
    backgroundColor: colors.grayScale200,
    ...styles.mv15,
  },
  preferenceView: {
    ...styles.flexRow,
    ...styles.mt10,
  },
  makeFrContainer: {
    ...styles.rowCenter,
    ...styles.mr25,
  },
  underlineView: {
    height: moderateScale(1),
    width: '100%',
    backgroundColor: colors.grayScale200,
    ...styles.mt2,
  },
  btnStyle: {
    width: '48%',
  },
  selectIcon: {
    ...styles.mr5,
  },
});
