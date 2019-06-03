import { Dimensions } from 'react-native';

export const dimensions = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#00b482',
  secondary: '#711e82',
  text: '#323237',
  textLight: '#ccc',
  red: '#db5859',
  background: '#fff',
  white: '#fff',
  green: '#7ed321',
  lightGreen: '#a4e063',
  grey: '#a0a4a8',
  lightGrey: '#f8f8f8',
  greyBG: '#bebebe',
  primaryGrey: '#6f6f6f',
  disableText: '#dadada',
  tabIcon: '#afaeae',
};

export const fonts = {
  normal: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  icons: 'customicons',
};

export const shadows = {
  bottomButtons: { elevation: 9, shadowOffset: { width: 0, height: -6 }, shadowColor: 'black', shadowOpacity: 0.05 },
};
