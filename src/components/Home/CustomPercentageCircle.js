import React, {useState} from 'react';
import {Animated} from 'react-native';

// custom import
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';

const CustomPercentageCircle = props => {
  let {progressText} = props;
  const [progress, setProgress] = useState('');

  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      borderColor: colors.white,
    }).start();
  };

  return (
    <Animated.View
      style={{
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(48 / 2),
        borderWidth: moderateScale(4),
        borderColor: 'white',
        ...styles.center,
        animateProgress,
      }}>
      <Animated.Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: colors.white,
        }}>
        {progressText}
      </Animated.Text>
    </Animated.View>
  );
};

export default CustomPercentageCircle;
