import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';

// custom import
import FText from '../../../../components/common/FText';
import {colors, styles} from '../../../../themes';
import {moderateScale} from '../../../../common/constants';
import {StackNav} from '../../../../navigation/navigationKey';

const UserStories = ({stories, ...props}) => {
  const navigation = useNavigation();

  const onPressStory = userImage =>
    navigation.navigate(StackNav.StoryView, {
      img: userImage,
    });

  const renderItem = ({item}) => (
    <Pressable
      style={localStyles.itemContainer}
      key={item}
      onPress={() => onPressStory(item.imgUrl)}>
      <View style={localStyles.imageBorder}>
        <FastImage source={item.image} style={[localStyles.itemImage]} />
      </View>

      <FText type={'s14'} style={localStyles.itemUsername}>
        {item.name}
      </FText>
    </Pressable>
  );

  return (
    <FlashList
      data={stories}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      horizontal={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={200}
      contentContainerStyle={localStyles.mainContainer}
      {...props}
    />
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.pv10,
  },
  itemContainer: {
    alignItems: 'center',
    ...styles.mr20,
  },
  imageBorder: {
    borderWidth: moderateScale(2),
    borderColor: colors.secondary1,
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
  },
  itemImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(2),
    borderColor: colors.white,
  },
  itemUsername: {
    ...styles.mt10,
  },
  itemInnerContainer: {
    padding: moderateScale(10),
    borderRadius: moderateScale(40),
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default UserStories;
