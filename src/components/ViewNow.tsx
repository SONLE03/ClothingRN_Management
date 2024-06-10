import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { CUSTOM_COLOR } from '../theme/theme';
const ViewNow = (props: any) => {
  return (
    <View className='w-24 h-24 justify-center items-center'>
      <View className='border border-orange-500 rounded-xl p-1' style={styles.button}>
        <Text className='font-semibold text-black'>+{props.number}</Text>
        <Text className='font-semibold text-black'>{props.status}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ViewNow;