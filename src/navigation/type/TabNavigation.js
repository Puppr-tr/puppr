import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Add_Dark,
  Add_Light,
  Explore_Dark,
  Explore_Light,
  Home_Dark,
  Home_Light,
  Matches_Dark,
  Matches_Light,
  Message_Dark,
  Message_Light,
} from '../../assets/svg';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {
  getHeight,
  getWidth,
  isIOS,
  moderateScale,
} from '../../common/constants';
import {TabRoute} from '../navigationRoute';
import {TabNav} from '../navigationKey';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const TextAndIconComponent = memo(
    ({focused, InActiveIcon, ActiveIcon, title}) => {
      return (
        <View
          style={[
            localStyles.tabTextStyle,
            {backgroundColor: focused ? colors.secondary1 : null},
          ]}>
          {!focused ? (
            <InActiveIcon
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          ) : (
            <ActiveIcon width={moderateScale(24)} height={moderateScale(24)} />
          )}
        </View>
      );
    },
  );

  return (
    <Tab.Navigator
      initialRouteName={TabNav.HomeScreen}
      screenOptions={{
        tabBarStyle: localStyles.tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={TabNav.HomeScreen}
        component={TabRoute.HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TextAndIconComponent
              focused={focused}
              InActiveIcon={(props) => <Home_Light {...props} color={colors.grayScale500} />}
              ActiveIcon={(props) => <Home_Dark {...props} color={colors.primary} />}
              title={strings.home}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.ExploreScreen}
        component={TabRoute.ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TextAndIconComponent
              focused={focused}
              InActiveIcon={(props) => <Explore_Light {...props} color={colors.grayScale500} />}
              ActiveIcon={(props) => <Explore_Dark {...props} color={colors.primary} />}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={TabNav.AddPhoto}
        component={TabRoute.AddPhoto}
        options={{
          tabBarIcon: ({focused}) => (
            <TextAndIconComponent
              focused={focused}
              InActiveIcon={Add_Light}
              ActiveIcon={Add_Dark}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={TabNav.MatchesScreen}
        component={TabRoute.MatchesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TextAndIconComponent
              focused={focused}
              InActiveIcon={(props) => <Matches_Light {...props} color={colors.grayScale500} />}
              ActiveIcon={(props) => <Matches_Dark {...props} color={colors.primary} />}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.MessageScreen}
        component={TabRoute.MessageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TextAndIconComponent
              focused={focused}
              InActiveIcon={(props) => <Message_Light {...props} color={colors.grayScale500} />}
              ActiveIcon={(props) => <Message_Dark {...props} color={colors.primary} />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 25,
    zIndex: 1,
    borderRadius: moderateScale(40),
    ...styles.mh20,
    ...styles.ph20,
    height: moderateScale(64),
  },
  tabTextStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    ...styles.center,
    position: 'absolute',
    top: moderateScale(12),
  },
});
