import React from 'react';
import {AuthNav, StackNav} from '../navigationKey';
import {AuthRoute, StackRoute} from '../navigationRoute';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.OnBoarding}
        component={StackRoute.OnBoarding}
      />
      <Stack.Screen
        name={StackNav.AuthNavigation}
        component={StackRoute.AuthNavigation}
      />
      <Stack.Screen name={AuthNav.LogIn} component={AuthRoute.LogIn} />
      <Stack.Screen name={AuthNav.SignUp} component={AuthRoute.SignUp} />
      <Stack.Screen name={AuthNav.OtpVerify} component={AuthRoute.OtpVerify} />
      <Stack.Screen
        name={AuthNav.AccountName}
        component={AuthRoute.AccountName}
      />
      <Stack.Screen
        name={AuthNav.EnterBirthDate}
        component={AuthRoute.EnterBirthDate}
      />
      <Stack.Screen
        name={AuthNav.SelectGender}
        component={AuthRoute.SelectGender}
      />
      <Stack.Screen
        name={AuthNav.SelectInterest}
        component={AuthRoute.SelectInterest}
      />
      <Stack.Screen
        name={AuthNav.UploadPhoto}
        component={AuthRoute.UploadPhoto}
      />
      <Stack.Screen
        name={AuthNav.VerifyLoginOtp}
        component={AuthRoute.VerifyLoginOtp}
      />
      <Stack.Screen
        name={StackNav.TabNavigation}
        component={StackRoute.TabNavigation}
      />
      <Stack.Screen
        name={StackNav.DiscoverByInterest}
        component={StackRoute.DiscoverByInterest}
      />
      <Stack.Screen name={StackNav.Chat} component={StackRoute.Chat} />
      <Stack.Screen name={StackNav.Profile} component={StackRoute.Profile} />
      <Stack.Screen
        name={StackNav.ChooseLanguage}
        component={StackRoute.ChooseLanguage}
      />
      <Stack.Screen name={StackNav.Setting} component={StackRoute.Setting} />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
      />
      <Stack.Screen
        name={StackNav.MatchesUserDetails}
        component={StackRoute.MatchesUserDetails}
      />
      <Stack.Screen
        name={StackNav.MatchDatingScreen}
        component={StackRoute.MatchDatingScreen}
      />
      <Stack.Screen
        name={StackNav.StoryView}
        component={StackRoute.StoryView}
      />
    </Stack.Navigator>
  );
}
