import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// custom import

export default function UserPost() {
  const navigation = useNavigation();
  const {item, isFirst, swipe, ...rest} = props;

  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onSuperLike = swipe.y.interpolate({
    inputRange: [-200, -40],
    outputRange: [1, -2],
    extrapolate: 'clamp',
  });

  const onPressDetail = () =>
    navigation.navigate(StackNav.YourMatchProfile, {item: item});
  return (
    <View>
      <Text>UserPost</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
