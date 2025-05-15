import React from 'react';
import {AuthNav} from '../navigationKey';
import {AuthRoute} from '../navigationRoute';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={AuthNav.LogIn}>
      <Stack.Screen name={AuthNav.LogIn} component={AuthRoute.LogIn} />
      <Stack.Screen name={AuthNav.SignUp} component={AuthRoute.SignUp} />
      <Stack.Screen name={AuthNav.OtpVerify} component={AuthRoute.OtpVerify} />
      <Stack.Screen name={AuthNav.AccountName} component={AuthRoute.AccountName} />
      <Stack.Screen name={AuthNav.EnterBirthDate} component={AuthRoute.EnterBirthDate} />
      <Stack.Screen name={AuthNav.SelectGender} component={AuthRoute.SelectGender} />
      <Stack.Screen name={AuthNav.SelectInterest} component={AuthRoute.SelectInterest} />
      <Stack.Screen name={AuthNav.AboutScreen} component={AuthRoute.AboutScreen} />
      <Stack.Screen name={AuthNav.UploadPhoto} component={AuthRoute.UploadPhoto} />
      <Stack.Screen name={AuthNav.VerifyLoginOtp} component={AuthRoute.VerifyLoginOtp} />
      
      {/* Dog Profile Screens */}
      <Stack.Screen name={AuthNav.DogProfileName} component={AuthRoute.DogProfileName} />
      <Stack.Screen name={AuthNav.DogProfileAge} component={AuthRoute.DogProfileAge} />
      <Stack.Screen name={AuthNav.DogProfileGender} component={AuthRoute.DogProfileGender} />
      <Stack.Screen name={AuthNav.DogProfileBreed} component={AuthRoute.DogProfileBreed} />
      <Stack.Screen name={AuthNav.DogProfileNature} component={AuthRoute.DogProfileNature} />
      <Stack.Screen name={AuthNav.DogProfileBehavior} component={AuthRoute.DogProfileBehavior} />
      <Stack.Screen name={AuthNav.DogProfileSize} component={AuthRoute.DogProfileSize} />
      <Stack.Screen name={AuthNav.DogProfileTraining} component={AuthRoute.DogProfileTraining} />
      <Stack.Screen name={AuthNav.DogProfileAbout} component={AuthRoute.DogProfileAbout} />
    </Stack.Navigator>
  );
}
