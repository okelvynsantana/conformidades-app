import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[{ fontFamily: 'Poppins' }, style]} {...props} />;
};

export default CustomText;