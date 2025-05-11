import AccountName from '../container/Auth/AccountName';
import Splash from '../container/Splash';
import AuthNavigation from './type/AuthNavigation';
import TabNavigation from './type/TabNavigation';
import DiscoverByInterest from '../container/TabBar/explore/DiscoverByInterest';
import Chat from '../container/TabBar/Message/Chat';
import Profile from '../container/TabBar/Profile/Profile';
import ChooseLanguage from '../container/TabBar/Profile/ChooseLanguage';
import Setting from '../container/TabBar/Profile/Setting';
import EditProfile from '../container/TabBar/Profile/EditProfile';
import MatchesUserDetails from '../container/TabBar/Matches/MatchesUserDetails';
import MatchDatingScreen from '../container/TabBar/Home/MatchDatingScreen';

// Auth Screen
import LogIn from '../container/Auth/LogIn';
import OtpVerify from '../container/Auth/OtpVerify';
import SelectGender from '../container/Auth/SelectGender';
import SelectInterest from '../container/Auth/SelectInterest';
import SignUp from '../container/Auth/SignUp';
import UploadPhoto from '../container/Auth/UploadPhoto';
import VerifyLoginOtp from '../container/Auth/VerifyLoginOtp';
import OnBoarding from '../container/OnBoarding';
import EnterBirthDate from '../container/Auth/EnterBirthDate';
import StoryView from '../container/TabBar/Home/UserStory/StoryView';

// Tab Screen
import HomeScreen from '../container/TabBar/Home/HomeScreen';
import ExploreScreen from '../container/TabBar/explore/ExploreScreen';
import AddPhoto from '../container/TabBar/Add/AddPhoto';
import MatchesScreen from '../container/TabBar/Matches/MatchesScreen';
import MessageScreen from '../container/TabBar/Message/MessageScreen';

export const StackRoute = {
  Splash,
  OnBoarding,
  AuthNavigation,
  TabNavigation,
  DiscoverByInterest,
  Chat,
  Profile,
  ChooseLanguage,
  Setting,
  EditProfile,
  MatchesUserDetails,
  MatchDatingScreen,
  StoryView,
};

export const AuthRoute = {
  LogIn,
  SignUp,
  OtpVerify,
  AccountName,
  EnterBirthDate,
  SelectGender,
  SelectInterest,
  UploadPhoto,
  VerifyLoginOtp,
};

export const TabRoute = {
  HomeScreen,
  ExploreScreen,
  AddPhoto,
  MatchesScreen,
  MessageScreen,
};
