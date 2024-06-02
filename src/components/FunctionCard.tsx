import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageSourcePropType } from 'react-native';
import { CUSTOM_COLOR } from '../theme/theme';
import FONT_FAMILY from '../consts/fonts';

interface FunctionCardProps {
  onPress: () => void;
  source: ImageSourcePropType | null;
  text: string;
}

const FunctionCard: FC<FunctionCardProps> = (props) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={props.onPress}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={props.source}
        />
      </View>
      <View style={{ width: '100%', height: 7 }} />
      <Text style={styles.textViewStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '50%',
    height: '80%',
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '75%',
    height: '75%',
    resizeMode: 'stretch',
    tintColor: CUSTOM_COLOR.White,
  },
  textViewStyle: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
  },
});

export default FunctionCard;