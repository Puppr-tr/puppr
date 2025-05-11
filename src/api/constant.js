import images from '../assets/images';
import {
  BahasaIndonesiaFlag,
  CommentIcon,
  Comment_Icon,
  DeutschFlag,
  EnglishFlag,
  FrenchFlag,
  Group_White,
  ItalianFlag,
  LanguageIcon,
  Like_White_Icon,
  PortugueseFlag,
  ProfileIcon,
  RussianFlag,
  SettingIcon,
  SmileyEmojiIcon,
  SpanishFlag,
} from '../assets/svg';
import {moderateScale} from '../common/constants';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/navigationKey';
import {colors} from '../themes';

export const OnBoardingData = [
  {
    id: 1,
    title: strings.onBoardingText1,
    description: strings.onBoardingDes1,
    image: images.OnBoardingImage1,
  },
  {
    id: 2,
    title: strings.onBoardingText2,
    description: strings.onBoardingDes2,
    image: images.OnBoardingImage2,
  },
  {
    id: 3,
    title: strings.onBoardingText3,
    image: images.OnBoardingImage3,
  },
];

export const SelectGenderData = [
  {
    id: 1,
    title: strings.man,
    iconName: 'male',
  },
  {
    id: 2,
    title: strings.women,
    iconName: 'female',
  },
];

export const SelectInterestData = [
  '🎮 Gaming',
  '💃🏻 Dancing',
  '🎨 Painting',
  '🎧 Music',
  '📚 Reading',
  '🏛 Architecture',
  '🎥 Movies',
  '⚽️ Football',
  '🗣 Language',
  '🍃 Nature',
  '🙂 People',
  '🐼 Animals',
  ' 📸 Photography',
  '💪 Gym & Fitness',
];

export const AddPhotoData = [
  {
    id: 1,
    svgIcon: <SmileyEmojiIcon />,
    name: strings.add,
    icon: 'plus',
  },
  {
    id: 2,
    svgIcon: <SmileyEmojiIcon />,
    name: strings.add,
    icon: 'plus',
  },
];
export const AddPhotosData = [
  {
    id: 3,
    svgIcon: <SmileyEmojiIcon />,
    name: strings.add,
    icon: 'plus',
  },
  {
    id: 4,
    svgIcon: <SmileyEmojiIcon />,
    name: strings.add,
    icon: 'plus',
  },
  {
    id: 5,
    svgIcon: <SmileyEmojiIcon />,
    name: strings.add,
    icon: 'plus',
  },
];

export const postData = [
  {
    id: 1,
    name: 'My Story',
    subtitle: '2 hours ago',
    image: images.UserImage1,
  },
  {
    id: 2,
    name: 'Mildred',
    subtitle: '2 hours ago',
    image: images.UserImage2,
  },
  {
    id: 3,
    name: 'Fabian',
    subtitle: '2 hours ago',
    image: images.UserImage3,
  },
  {
    id: 4,
    name: 'Clara',
    subtitle: '2 hours ago',
    image: images.UserImage4,
  },
  {
    id: 5,
    name: 'George',
    subtitle: '2 hours ago',
    image: images.UserImage5,
  },
];

export const UserDetails = [
  {
    id: 2,
    name: 'Mildred',
    subtitle: '2 hours ago',
    image: images.UserImage2,
    messageUserName: 'Selena Grif',
    message: 'What about that new jacket if I ...',
    unRead: true,
    time: '09:18',
  },
  {
    id: 3,
    name: 'Fabian',
    subtitle: '2 hours ago',
    image: images.UserImage3,
    messageUserName: 'Fabian Mina',
    message: 'I know right 😉',
    unRead: false,
    time: '12:44',
  },
  {
    id: 4,
    name: 'Clara',
    subtitle: '2 hours ago',
    image: images.UserImage4,
    messageUserName: 'Clara Hazel',
    message: 'I’ve already registered, can’t wai...',
    unRead: true,
    time: '08:06',
  },
  {
    id: 5,
    name: 'George',
    subtitle: '2 hours ago',
    image: images.UserImage5,
    messageUserName: 'George Calzoni ',
    message: 'It will have two lines of heading ...',
    unRead: true,
    time: '09:32',
  },
  {
    id: 6,
    name: 'Brandon',
    subtitle: '2 hours ago',
    image: images.MessageUerImage1,
    messageUserName: 'Brandon Aminoff ',
    message: 'It will have two lines of heading ...',
    unRead: false,
    time: '06:21',
  },
  {
    id: 7,
    name: 'Savanna',
    subtitle: '2 hours ago',
    image: images.MessageUerImage2,
    messageUserName: 'Savanna Hall ',
    message: 'Oh come on!! Is it really that gre...',
    unRead: false,
    time: '05:01',
  },
  {
    id: 8,
    name: 'Sara',
    subtitle: '2 hours ago',
    image: images.MessageUerImage3,
    messageUserName: 'Sara Grif ',
    message: 'I know right 😉',
    unRead: false,
    time: '04:26',
  },

  {
    id: 9,
    name: 'Alfredo',
    subtitle: '2 hours ago',
    image: images.MessageUerImage4,
    messageUserName: 'Alfredo Calzoni ',
    message: 'It will have two lines of heading ...',
    unRead: true,
    time: '01:10',
  },
];

export const MakeFriendsData = [
  {
    id: 1,
    interest: '⚽️  Playtime',
    postText: strings.ifYouCouldLiveAnywhereInTheWorldWhereWouldYouPick,
    profileImage: images.MakeFriendsUserImage1,
    userName: 'Fabian',
    description: strings.VictoriaPark,
    bgImage: images.MakeFriendsPost2,
  },
  {
    id: 2,
    interest: '🍖 Food',
    postText: strings.whoDoYouThinkWillWinEuro,
    profileImage: images.MakeFriendsUserImage2,
    userName: 'Mildred',
    description: strings.hamburg,
    bgImage: images.MakeFriendsPost1,
  },
];

export const MakePartnersData = () => [
  {
    id: 1,
    image: images.MakePartnersImage1,
    distance: '2.5 Km away',
    matches: '80%',
    matchesUserName: 'Alfredo Calzoni, 20',
    location: 'HAMBURG, GERMANY',
    cityName: 'GERMANY',
    userName: 'Alfredo, 20',
    matchesUser: 'Alfredo Calzoni',
    tickMark: true,
    nearBy: '2.5 Km',
    name: 'Alfredo',
  },
  {
    id: 2,
    image: images.MakePartnersImage2,
    distance: '16.8 Km away',
    matches: '80%',
    matchesUserName: 'Alfonso Gouse, 23',
    location: 'HAMBURG, GERMANY',
    cityName: 'GERMANY',
    userName: 'Alfonso, 23',
    matchesUser: 'Alfonso Gouse',
    tickMark: false,
    nearBy: '16.8 Km',
    name: 'Alfonso',
  },
  {
    id: 3,
    image: images.MakePartnersImage3,
    distance: '7.2 Km away',
    matches: '80%',
    matchesUserName: 'James Schmidt, 20',
    location: 'HAMBURG, GERMANY',
    cityName: 'KOLN',
    userName: 'James, 20',
    matchesUser: 'James Schmidt',
    tickMark: true,
    nearBy: '2.7 Km',
    name: 'James',
  },
  {
    id: 4,
    image: images.DiscoverUserImage1,
    userName: 'Halima, 19',
    distance: '7.2 Km away',
    cityName: 'BERLIN',
    matchesUser: 'Halima Calzoni',
    tickMark: true,
    name: 'Halima',
    nearBy: '7.2 Km',
    location: 'HAMBURG, GERMANY',
    matches: '90%',
    matchesUserName: 'Halima Calzoni, 21',
  },
  {
    id: 5,
    image: images.DiscoverUserImage2,
    userName: 'Vanessa, 18',
    distance: '4,8 km away',
    cityName: 'MUNICH',
    matchesUser: 'Vanessa Calzoni',
    tickMark: false,
    nearBy: '4.8 Km',
    name: 'Vanessa',
    location: 'HAMBURG, GERMANY',
    matches: '50%',
    matchesUserName: 'Vanessa Calzoni, 24',
  },
  {
    id: 6,
    image: images.DiscoverUserImage3,
    userName: 'James, 20',
    distance: '2,2 km away',
    cityName: 'HANOVER',
    matchesUser: 'James Calzoni',
    tickMark: false,
    name: 'James',
    nearBy: '2.2 Km',
    location: 'HAMBURG, GERMANY',
    matches: '95%',
    matchesUserName: 'James Calzoni, 27',
  },
];

export const InterestData = [
  '🎮 ' + strings.gaming,
  '💃🏻 ' + strings.dancing,
  '🎨 ' + strings.painting,
  '🎧 ' + strings.music,
  '📚 ' + strings.reading,
  '🏛 ' + strings.architecture,
  '🎥 ' + strings.movie,
  '⚽️ ' + strings.football,
  '🗣 ' + strings.language,
  '🍃 ' + strings.nature,
  '🙂 ' + strings.people,
  '🐼 ' + strings.animals,
];

export const DiscoverByInterestData = [
  {
    id: 1,
    image: images.PhotographyImage,
    title: strings.photography,
    value: '3.2k ' + strings.people,
  },
  {
    id: 2,
    image: images.NatureImage,
    title: strings.nature,
    value: '9.8k ' + strings.people,
  },
  {
    id: 3,
    image: images.MusicImage,
    title: strings.music,
    value: '4.7k ' + strings.people,
  },
  {
    id: 4,
    image: images.WritingImage,
    title: strings.writing,
    value: '379 ' + strings.people,
  },
  {
    id: 5,
    image: images.FashionImage,
    title: strings.fashion,
    value: '3.4k ' + strings.people,
  },
  {
    id: 6,
    image: images.ArchitectureImage,
    title: strings.architecture,
    value: '3.4k ' + strings.people,
  },
];

export const ChatData = [
  {
    id: 1,
    message: 'Hi Nadia, Clara here! 👋 ️',
    type: 'receiver',
    time: '8:24 PM',
  },
  {
    id: 2,
    message: 'Hey Clara, Nice to meet you! ☺',
    type: 'sender',
  },
  {
    id: 3,
    message: 'You too! Seems we have same things in common here',
    type: 'receiver',
  },
  {
    id: 4,
    message: 'So what song are you currently listening to?',
    type: 'sender',
    time: '9:00 PM',
  },
  {
    id: 5,
    message: 'Been listening to John Mayer’s new song, Last Train Home ',
    type: 'receiver',
  },
  {
    id: 3,
    message: 'You too! Seems we have same things in common here',
    type: 'receiver',
  },
  {
    id: 4,
    message: 'So what song are you currently listening to?',
    type: 'sender',
    time: '9:00 PM',
  },
  {
    id: 5,
    message: 'Been listening to John Mayer’s new song, Last Train Home ',
    type: 'receiver',
  },
  {
    id: 3,
    message: 'You too! Seems we have same things in common here',
    type: 'receiver',
  },
  {
    id: 4,
    message: 'So what song are you currently listening to?',
    type: 'sender',
    time: '9:00 PM',
  },
  {
    id: 5,
    message: 'Been listening to John Mayer’s new song, Last Train Home ',
    type: 'receiver',
  },
];

export const SettingData = [
  {
    id: 1,
    iconName: <ProfileIcon />,
    title: strings.myAccount,
    route: StackNav.EditProfile,
  },
  {
    id: 2,
    iconName: <LanguageIcon />,
    title: strings.language,
    value: 'English',
    route: StackNav.ChooseLanguage,
  },
  {
    id: 3,
    iconName: <SettingIcon />,
    title: strings.setting,
    route: StackNav.Setting,
  },
];

export const ChooseLanguageData = [
  {
    id: 1,
    flag: <EnglishFlag />,
    lnName: strings.english,
  },
  {
    id: 2,
    flag: <DeutschFlag />,
    lnName: strings.deutsch,
  },
  {
    id: 3,
    flag: <SpanishFlag />,
    lnName: strings.spanish,
  },
  {
    id: 4,
    flag: <FrenchFlag />,
    lnName: strings.french,
  },
  {
    id: 5,
    flag: <PortugueseFlag />,
    lnName: strings.portuguese,
  },
  {
    id: 6,
    flag: <BahasaIndonesiaFlag />,
    lnName: strings.bahasaIndonesia,
  },
  {
    id: 7,
    flag: <RussianFlag />,
    lnName: strings.russian,
  },
  {
    id: 8,
    flag: <ItalianFlag />,
    lnName: strings.italian,
  },
];

export const PrivacyData = [
  {
    id: 1,
    title: strings.notifications,
  },
  {
    id: 2,
    title: strings.privacyPolicy,
    desc: strings.chooseWhatDataYouShareWithUs,
  },
  {
    id: 3,
    title: strings.termsOfService,
  },
];

export const LikeAndConnectData = [
  {
    id: 1,
    title: strings.likes,
    value: '32',
    image: images.MatchesUserImage1,
    svgIcon: <Like_White_Icon />,
  },
  {
    id: 2,
    title: strings.connect,
    value: '15',
    image: images.MatchesUserImage2,
    svgIcon: (
      <Comment_Icon width={moderateScale(28)} height={moderateScale(28)} />
    ),
  },
];

export const GenderAgeFrData = [
  {
    id: 1,
    title: strings.gender,
    value: strings.male,
    iconName: 'male',
  },
  {
    id: 2,
    title: strings.age,
    value: '20 years old',
    iconName: 'calendar-outline',
  },
  {
    id: 3,
    title: strings.friends,
    value: '2724',
    svgIcon: <Group_White />,
  },
];

export const LikeDisLikeBtnData = [
  {
    id: 1,
    bgColor: colors.white,
    iconName: 'close',
    iconColor: colors.primary,
  },
  {
    id: 2,
    bgColor: colors.primary,
    iconName: 'star',
    iconColor: colors.white,
  },
  {
    id: 3,
    bgColor: colors.secondary1,
    iconName: 'heart',
    iconColor: colors.white,
  },
];

export const userStoryData = [
  {
    content:
      'https://videos.pexels.com/video-files/3191251/3191251-uhd_2732_1440_25fps.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content:
      'https://videos.pexels.com/video-files/3042473/3042473-uhd_2560_1440_30fps.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content:
      'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://user-images.githubusercontent.com/129170600/231969994-09ab3ca2-90c7-484e-bf91-1208f3d47ff0.jpeg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://user-images.githubusercontent.com/129170600/231970010-773f30db-3977-4276-a8dc-7882b54a111d.jpeg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://user-images.githubusercontent.com/129170600/231970027-0ee9b05e-52a6-4e77-81ae-5f38af8bf1f4.jpeg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://videos.pexels.com/video-files/853770/853770-hd_1920_1080_25fps.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content:
      'https://videos.pexels.com/video-files/1851002/1851002-hd_1920_1080_24fps.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content:
      'https://user-images.githubusercontent.com/129170600/231970060-9ed373d9-bc3f-4f35-a7cb-29c01b69b792.jpeg',
    type: 'image',
    finish: 0,
  },
];
