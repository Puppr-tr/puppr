import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// custom import
import {MakePartnersData} from '../../../api/constant';
import SearchPartners from './SearchPartners';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../../common/constants';
import {colors, styles} from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderNullComponent from '../../../components/Home/RenderNullComponent';
import {getAsyncStorageData} from '../../../utils/AsyncStorage';
import {StackNav} from '../../../navigation/navigationKey';

export default function SearchPartnerCard() {
  const [data, setData] = useState(MakePartnersData());
  const swipe = useRef(new Animated.ValueXY()).current;
  const navigation = useNavigation();

  useEffect(() => {
    swipe.setValue({x: 0, y: 0});
  }, [data]);

  const LikeDislikeBtnData = [
    {
      id: 1,
      iconName: 'close',
      iconColor: colors.primary,
      bgColor: colors.white,
      onPress: () => onPressNope(),
    },
    {
      id: 2,
      iconName: 'star',
      bgColor: colors.primary,
      iconColor: colors.white,
      onPress: () => onPressSuperLike(),
    },
    {
      id: 3,
      iconName: 'heart',
      bgColor: colors.secondary1,
      iconColor: colors.white,
      onPress: () => onPressLike(data),
    },
  ];

  const LikeAndDisLikeBtn = ({index, item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        key={index}
        style={[
          localStyle.likeAndDislikeBtnBg,
          {
            backgroundColor: item.bgColor,
          },
        ]}>
        <Ionicons
          name={item.iconName}
          size={moderateScale(28)}
          color={item.iconColor}
        />
      </TouchableOpacity>
    );
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      let isActionActive = Math.abs(dx) > 200;
      let isSuperLike = Math.abs(dy) > 300;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: dx * 500, y: dy},
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (dx > 0) {
            removeCard('like');
          } else {
            removeCard('dislike');
          }
        });
      } else if (dy < 100 && isSuperLike) {
        Animated.timing(swipe, {
          toValue: {x: dx * 500, y: dy * 500},
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          removeCard('superLike');
        });
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const removeCard = action => {
    if (data && data[0]?.gender) {
      getAsyncStorageData(data[0]?.gender).then(response => {
        if (response) {
          navigation.navigate(StackNav.CommonMatch, {item: data[0]});
        }
        setData(data => data?.slice(1));
      });
    } else {
      console.warn('Gender is null or undefined for the current card');
      setData(data => data?.slice(1));
    }
  };

  const onPressSelection = useCallback(
    direction => {
      console.log(direction);
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        if (direction === -1) {
          setData(data => data?.slice(1));
        }
        if (direction === 1) {
          removeCard('like');
          setData(data => data?.slice(1));
        }
      });
    },
    [swipe, data],
  );

  const onPressSuperLike = useCallback(() => {
    Animated.timing(swipe, {
      toValue: {x: 0, y: -1 * 700},
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      removeCard('superLike');
      onPressSelection(1);
    });
  }, [swipe, data]);

  const onPressLike = item => {
    onPressSelection(+1);
    navigation.navigate(StackNav.MatchDatingScreen, {item: item});
  };

  const onPressNope = () => onPressSelection(-1);

  const renderItem = (item, index) => {
    let isFirst = index === 0;
    let dragHandlers = isFirst ? panResponder.panHandlers : {};
    return (
      <SearchPartners
        item={item}
        isFirst={isFirst}
        swipe={swipe}
        {...dragHandlers}
      />
    );
  };

  return (
    <View style={localStyle.mainContainer}>
      <View>
        {data && data.map((item, index) => renderItem(item, index)).reverse()}
      </View>
      <View style={localStyle.renderLikeAndDislikeBtn}>
        {LikeDislikeBtnData.map((item, index) => {
          return <LikeAndDisLikeBtn item={item} />;
        })}
      </View>
      {!data?.length && (
        <View style={localStyle.emptyComponent}>
          <RenderNullComponent
            title1={strings.noNewCardsAvailable}
            title2={strings.noNewCardsAvailableDesc}
          />
        </View>
      )}
    </View>
  );
}

const localStyle = StyleSheet.create({
  mainContainer: {
    width: deviceWidth - moderateScale(40),
    height: deviceHeight / 1.6,
    borderRadius: moderateScale(24),
    ...styles.mt20,
    ...styles.selfCenter,
    backgroundColor: colors.white,
    ...styles.p10,
  },
  renderLikeAndDislikeBtn: {
    ...styles.flexCenter,
    ...styles.wrap,
    ...styles.mb10,
    ...styles.selfCenter,
    height: deviceHeight / 1.6 - getHeight(430),
    position: 'absolute',
    bottom: 0,
  },
  likeAndDislikeBtnBg: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(56 / 2),
    ...styles.center,
    ...styles.mh20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyComponent: {
    ...styles.justifyCenter,
    height: '90%',
  },
});
