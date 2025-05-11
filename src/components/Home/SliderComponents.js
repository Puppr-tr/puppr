import {StyleSheet, View} from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// custom import
import {colors, styles} from '../../themes';
import {deviceWidth, moderateScale} from '../../common/constants';

export default function SliderComponents(props) {
  const {endPoint, maxValue, onValuesChange, startPoint = null, width} = props;

  const customMarker = event => {
    return (
      <View style={localStyle.markerContainer}>
        <View style={localStyle.markerBg}>
          <View style={localStyle.sliderLength}>
            <View style={localStyle.innerLineView} />
            <View style={localStyle.innerLineView} />
            <View style={localStyle.innerLineView} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mh10}>
      <MultiSlider
        sliderLength={width ? width : deviceWidth - moderateScale(40)}
        values={[endPoint]}
        min={0}
        max={maxValue}
        step={1}
        markerOffsetY={20}
        valuePrefix={100}
        onValuesChange={onValuesChange}
        selectedStyle={{backgroundColor: colors.secondary1}}
        trackStyle={[
          localStyle.sliderContainer,

          {
            backgroundColor: colors.grayScale200,
          },
        ]}
        customMarker={customMarker}
      />
      {/* <View style={localStyle.lowerTextStyle}>
        <CText type={'B16'}>{'0, 5 ' + String.gr}</CText>
        <CText type={'B16'}>{'1000 ' + String.gr}</CText>
      </View> */}
    </View>
  );
}

const localStyle = StyleSheet.create({
  sliderContainer: {
    height: moderateScale(8),
    borderRadius: moderateScale(12),
  },

  sliderLength: {
    ...styles.rowCenter,
    ...styles.center,
    ...styles.p5,
  },
  markerContainer: {
    height: moderateScale(55),
  },
  lowerTextStyle: {
    ...styles.rowSpaceBetween,
  },
  markerBg: {
    height: moderateScale(32),
    width: moderateScale(45),
    borderRadius: moderateScale(24),
    borderWidth: moderateScale(4),
    borderColor: colors.white,
    backgroundColor: colors.secondary1,
  },
  innerLineView: {
    height: moderateScale(11),
    backgroundColor: colors.white,
    width: moderateScale(2),
    ...styles.mh3,
  },
});
