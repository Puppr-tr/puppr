import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom import
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import FText from './FText';
import Typography from '../../themes/typography';

export default FInput = props => {
  let {
    _value,
    label,
    bgColor,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    keyBoardType,
    _onFocus,
    _onBlur,
    _errorText,
    _autoFocus,
    _maxLength,
    _editable = true,
    autoCapitalize,
    required = false,
    labelStyle,
    multiline,
    errorStyle,
    fieldRef,
    isSecure,
    textColor,
    labelTextColor,
    rightAccessory,
    typeText,
    insideLeftIcon,
    showError = true,
  } = props;

  const [isSecurePass, setIsSecurePass] = useState(isSecure);

  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };
  const onPressSecureIcon = () => {
    setIsSecurePass(!isSecurePass);
  };

  return (
    <View style={styles.mv10}>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <View style={styles.flexRow}>
            <FText
              style={localStyle.labelText}
              color={labelTextColor ? labelTextColor : colors.grayScale400}
              type={typeText ? typeText : 'r16'}>
              {label}
            </FText>
            {required && (
              <FText style={{color: colors.alertColor}}>{' *'}</FText>
            )}
          </View>
        </View>
      )}
      <View
        style={[
          localStyle.inputContainer,
          {
            borderColor: _errorText
              ? colors.alertColor
              : bgColor
              ? bgColor
              : colors.white,
            height: multiline ? getHeight(100) : getHeight(52),
            backgroundColor: bgColor ? bgColor : colors.white,
          },
          inputContainerStyle,
        ]}>
        {insideLeftIcon ? (
          <View style={styles.pl10}>{insideLeftIcon()}</View>
        ) : null}
        <TextInput
          ref={fieldRef}
          secureTextEntry={isSecurePass}
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          autoFocus={_autoFocus}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.grayScale400}
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          multiline={multiline}
          editable={_editable}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder={placeHolder}
          style={[
            localStyle.inputBox,
            {color: textColor ? textColor : colors.black},
            {
              // height: multiline ? getHeight(75) : getHeight(52),
            },
            inputBoxStyle,
            _editable == false && {color: colors.white},
          ]}
          {...props}
        />
        {/* Right Icon And Content Inside TextInput */}
        <View style={[styles.mr15]}>
          {rightAccessory ? rightAccessory() : null}
        </View>
        {!!isSecure && (
          <TouchableOpacity onPress={onPressSecureIcon}>
            <Ionicons
              name={!isSecurePass ? 'eye-outline' : 'eye-off-outline'}
              size={moderateScale(24)}
              color={colors.grayScale500}
              style={styles.mr10}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Error Text Message Of Input */}
      {_errorText && _errorText != '' ? (
        <FText
          style={{
            ...localStyle.errorText,
            ...errorStyle,
            color: colors.alertColor,
          }}>
          {_errorText}
        </FText>
      ) : null}

      {_maxLength && showError && _value?.length > _maxLength ? (
        <FText style={{...localStyle.errorText, ...errorStyle}}>
          It should be maximum {_maxLength} character
        </FText>
      ) : null}
    </View>
  );
};

const localStyle = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  inputBox: {
    ...Typography.fontSizes.f16,
    ...Typography.fontWeights.Regular,
    ...styles.ph10,
    ...styles.flex,
    backgroundColor: colors.white,
    borderRadius: moderateScale(24),
    width: '90%',
    ...styles.selfCenter,
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    ...styles.rowSpaceBetween,
    ...styles.mt5,
    width: '100%',
    ...styles.selfCenter,
  },
  labelContainer: {
    ...styles.mt10,
    ...styles.rowSpaceBetween,
    ...styles.mb5,
  },
  errorText: {
    ...Typography.fontSizes.f12,
    ...styles.mt5,
    ...styles.ml5,
  },
});
