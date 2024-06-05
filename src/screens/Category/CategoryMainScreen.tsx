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
const CategoryMainScreen = ({navigation} : any) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <View className='flex flex-row font-semibold space-x-2 space-y-0'>
              <MaterialIcons className='mr-2 mt-2' name="apps" size={30} color="#333" />
              <Text className='ml-2 text-black text-2xl font-semibold'>Manage Categories</Text>
            </View>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("CategoryScreen" as never)}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Category</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity >
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("BranchScreen")}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Branch</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View className='flex mx-2 bg-gray-400 rounded-3xl' />
        <TouchableOpacity className='border border-orange-500 rounded-xl mt-4 p-2' style={styles.option} onPress={() => navigation.navigate("GenderScreen")}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Product Gender</Text>
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
export default CategoryMainScreen;