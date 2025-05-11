import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import FSafeAreaView from '../../../components/common/FSafeAreaView';
import FHeader from '../../../components/common/FHeader';
import strings from '../../../i18n/strings';
import {colors, styles} from '../../../themes';
import FSearchInput from '../../../components/common/FSearchInput';
import {moderateScale} from '../../../common/constants';
import {ChooseLanguageData} from '../../../api/constant';
import FText from '../../../components/common/FText';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';

export default function ChooseLanguage({navigation}) {
  const [search, setSearch] = useState(ChooseLanguageData);
  const [isSelect, setIsSelect] = useState();
  const [searchText, setSearchText] = useState('');

  const onSearchInput = useCallback(text => {
    setSearchText(text);
  }, []);

  const onPressSelect = item => {
    setIsSelect(item);
    // navigation.goBack()
  };
  useEffect(() => {
    filterData();
  }, [searchText]);

  const filterData = () => {
    if (!!searchText) {
      const filteredData = ChooseLanguageData.filter(item =>
        item?.lnName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearch(filteredData);
    } else {
      setSearch(ChooseLanguageData);
    }
  };
  const chooseLanguage = ({item, index}) => {
    return (
      <TouchableOpacity
        style={localStyle.languageContainer}
        onPress={() => onPressSelect(item.lnName)}>
        <View style={localStyle.flagAndLanguage}>
          {item.flag}
          <FText type={'M16'} style={localStyle.languageText}>
            {item?.lnName}
          </FText>
        </View>
        {isSelect === item.lnName && (
          <Ionicons
            name={'checkbox'}
            color={colors.secondary1}
            size={moderateScale(24)}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <FSafeAreaView style={localStyle.mainScreenView}>
      <FHeader title={strings.chooseLanguage} />
      <KeyBoardAvoidWrapper containerStyle={localStyle.mainRoot}>
        <FSearchInput search={search} onSearchInput={onSearchInput} />
        <FlatList
          data={search}
          renderItem={chooseLanguage}
          keyExtractor={(item, index) => item.id}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </KeyBoardAvoidWrapper>
    </FSafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  mainScreenView: {
    backgroundColor: colors.white,
  },
  mainRoot: {
    ...styles.ph20,
    ...styles.flexGrow1,
  },
  languageContainer: {
    height: moderateScale(56),
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    ...styles.rowSpaceBetween,
    ...styles.p15,
    borderColor: colors.grayScale200,
    ...styles.mv10,
    borderWidth: moderateScale(1),
  },
  flagAndLanguage: {
    ...styles.rowCenter,
  },
  languageText: {
    ...styles.ml15,
  },
});
