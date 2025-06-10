import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ProductMainScreen = ({navigation} : any) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 space-y-0 text-black'>
              <MaterialIcons className='mr-2 mt-2' name="dataset" size={30} color="#333" />
              <Text className='ml-2 text-gray-800'>Manage Products</Text>
            </Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("CategoryMainScreen")}>
          <View style={styles.optionContent}>
            <Text className='focus:text-orange-500 font-semibold text-gray-600' style={styles.optionText}>Category</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("ProductScreen")}>
          <View style={styles.optionContent}>
            <Text className='focus:text-orange-500 font-semibold text-gray-600' style={styles.optionText}>Product</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl'  />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("ColorScreen")}>
          <View style={styles.optionContent}>
            <Text className='focus:text-orange-500 font-semibold text-gray-600' style={styles.optionText}>Color</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        {/* <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("SizeScreen")}>
          <View style={styles.optionContent}>
            <Text className='focus:text-orange-500 font-semibold text-gray-600' style={styles.optionText}>Size</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity> */}
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("ImportProductScreen")}>
          <View style={styles.optionContent}>
            <Text className='focus:text-orange-500 font-semibold text-gray-600' style={styles.optionText}>Import</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 24,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});
export default ProductMainScreen;