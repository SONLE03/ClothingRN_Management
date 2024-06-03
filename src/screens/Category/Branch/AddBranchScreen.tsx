import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
  } from 'react-native';
import { AddBranch } from '../../../api/category/branch/AddBranch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import CustomButton from '../../../components/CustomButton';
const AddBranchScreen = ({navigation} : any) => {
    const [name, setCateName] = useState('');

    const handleAddBranch = async () => {
        try {
            if (name === '') {
                Alert.alert('Lack of information');
            }else{
                await AddBranch(name);
                Alert.alert('Branch created successfully');
            }
        } catch (error) {
          console.error('Failed to create branch:', error);
          Alert.alert('Failed to create branch');
        }
      };
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Add Branch</Text>
            </TouchableOpacity>
            <>
              <View style={[styles.inputContainer, {height: 90}]}>
                <View style={{width: '100%', height: 10}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                    <Text style={styles.titleInputStyle}>Name Of Branch</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-end'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                  </View>
                </View>
                {/* <View style={{width: '100%', height: 5}} /> */}
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => {
                        setCateName(text);
                    }}
                    value={name}
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <CustomButton label={'Save'} onPress={handleAddBranch} />
        </SafeAreaView>
    )
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
    spaceContainer: {
        width: '100%',
        height: 10,
      },
    inputContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 0.5,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'column',
      },
      unitTitleContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
      },
      titleInputStyle: {},
})
export default AddBranchScreen;