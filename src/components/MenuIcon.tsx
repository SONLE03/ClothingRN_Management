import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface MenuIconProps {
  onPress: () => void;
  iconName: string
}

const MenuIcon: FC<MenuIconProps> = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
       <Ionicons name={iconName} size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuIcon;