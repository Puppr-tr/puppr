import {TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

// custom import
import FInput from './FInput';
import {SearchIcon} from '../../assets/svg';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';

const FSearchInput = props => {
  const {onSearchInput, search, rightIcon} = props;
  //   const navigation = useNavigation();

  const searchIcon = () => {
    return (
      <TouchableOpacity>
        <SearchIcon />
      </TouchableOpacity>
    );
  };

  return (
    <FInput
      placeHolder={strings.search}
      _value={search}
      keyBoardType={'default'}
      autoCapitalize={'none'}
      insideLeftIcon={searchIcon}
      toGetTextFieldValue={onSearchInput}
      bgColor={colors.background}
      rightAccessory={rightIcon}
      inputBoxStyle={{
        backgroundColor: colors.background,
      }}
    />
  );
};

export default memo(FSearchInput);
