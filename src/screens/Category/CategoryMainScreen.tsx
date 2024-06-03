import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    Image
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
const CategoryMainScreen = ({navigation} : any) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Manage Category</Text>
        </TouchableOpacity>
        <View style={styles.spaceContainer} />
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("CategoryScreen" as never)}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Category</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.spaceContainer} />
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("BranchScreen")}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Branch</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.spaceContainer} />
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("GenderScreen")}>
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
  spaceContainer: {
    height: 10,
    backgroundColor: '#d3d3d3',
    marginBottom: 10,
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
    borderBottomColor: '#d3d3d3',
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