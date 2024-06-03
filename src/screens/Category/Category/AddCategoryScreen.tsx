import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
  } from 'react-native';
import { CreateCategory } from '../../../api/category/category/AddNewCategory';
import { Gender, Category } from '../../../types/Category';
import { GetAllGender } from '../../../api/category/gender/GetAllGender';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../../components/CustomButton';
const AddCategoryScreen = ({navigation} : any) => {
    // const navigation = useNavigation();
    const [name, setCateName] = useState('');
    const [productGender, setProductGender] = useState('');
    const [genders, setGenders] = useState<Gender[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFocus, setIsFocus] = useState(false);  

    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const genderData = await GetAllGender();
            setGenders(genderData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const handleAddCategory = async () => {
        try {
            if (name === '' || productGender == null) {
                Alert.alert('Lack of information');
            }else{
                await CreateCategory(name, productGender);
                fetchData();
                Alert.alert('Category created successfully');
            }
        } catch (error) {
          console.error('Failed to create category:', error);
          Alert.alert('Failed to create category');
        }
      };
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Add Category</Text>
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
                    <Text style={styles.titleInputStyle}>Name Of Category</Text>
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
                    <Text style={styles.titleInputStyle}>Product Gender</Text>
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
                  <Dropdown 
                    style={[
                        styles.comboType,
                        isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={genders}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={productGender}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setProductGender(item.id as never);
                            setIsFocus(false);
                        }}
                    />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <CustomButton label={'Save'} onPress={handleAddCategory} />
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
      comboxContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 0.5,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'row',
      },
      unitComboContainer: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
      },
      comboType: {
        width: '85%',
        height: '70%',
        borderColor: CUSTOM_COLOR.MineShaft,
        borderWidth: 0.5,
        borderRadius: 1,
        paddingHorizontal: '5%',
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      dateContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 0.5,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'column',
      },
      unitDateContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
      },
      dateStyle: {
        width: '85%',
        height: '70%',
        borderColor: CUSTOM_COLOR.MineShaft,
        borderWidth: 0.5,
        borderRadius: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        // alignItems: 'center',
      },
      buttonContainer: {
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
export default AddCategoryScreen;