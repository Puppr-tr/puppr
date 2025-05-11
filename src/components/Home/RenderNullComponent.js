import {Image, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';

// Custom Imports

import images from '../../assets/images';
import {colors, styles} from '../../themes';
import FText from '../common/FText';
import {getHeight} from '../../common/constants';

const RenderNullComponent = props => {
  const {title1, title2} = props;
  return (
    <View style={localStyles.root}>
      <Image source={images.nullImageLight} style={localStyles.imageStyle} />
      {!!title1 && (
        <FText type={'b18'} align={'center'} style={styles.mb10}>
          {title1}
        </FText>
      )}
      {!!title2 && (
        <FText type={'r16'} align={'center'}>
          {title2}
        </FText>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flexCenter,
    ...styles.ph30,
  },
  imageStyle: {
    height: getHeight(230),
    width: '100%',
    ...styles.selfCenter,
    ...styles.mb20,
    resizeMode: 'contain',
  },
});

export default memo(RenderNullComponent);
