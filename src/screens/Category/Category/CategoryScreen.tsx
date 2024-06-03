import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    FlatList
  } from 'react-native';
import { Category } from '../../../types/Category';
import { GetAllCategory } from '../../../api/category/category/GetAllCategory';
import { GetAllGender } from '../../../api/category/gender/GetAllGender';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUSTOM_COLOR, COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../../../theme/theme';
import { DeleteCategory } from '../../../api/category/category/DeleteCategory';
const CategoryScreen = ({navigation} : any) => {
    // const navigation = useNavigation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await GetAllCategory();
            const genderData = await GetAllGender();
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const filteredCategory = categories.filter(category =>
        category.name.toLowerCase().includes(searchText)
    );
    const handleAddCategory = () => {
        navigation.navigate("AddCategoryScreen" as never)   
    }
    const deleteCategory = async (id : string) => {
        const result = await DeleteCategory(id);
        Alert.alert(result);
    }
    const renderItem = ({ item }: { item: Category }) => {
        const handleEdit = () => {
          navigation.navigate('EditCategoryScreen', {item: item});
        };
    
        const handleDelete = () => {
          Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${item.name}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  deleteCategory(item.id)
                },
              },
            ]
          );
        };
    
        return (
          <View style={styles.row}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionButtonEdit}
                onPress={handleEdit}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtonDelete}
                onPress={handleDelete}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
        
      return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Category List</Text>
            </TouchableOpacity>
            <View style={styles.InputContainerComponent}>
                <TouchableOpacity>
                    <MaterialComunityIcons
                    name="home-search"
                    size={25}
                    style={styles.InputIcon}
                    />
                </TouchableOpacity>

                <TextInput placeholder='Find your categories here...' 
                    value={searchText}
                    onChangeText={text => {
                    setSearchText(text);
                    }}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.TextInputContainer}
                />
                <TouchableOpacity onPress={() => fetchData()}>
                    <MaterialComunityIcons
                    name="refresh"
                    size={25}
                    style={styles.InputIcon}
                    />
                </TouchableOpacity>
        </View>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            
            <View style={styles.table}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Category Name</Text>
                    <Text style={styles.headerText}>Action</Text>
                </View>
                <FlatList
                    data={filteredCategory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
          )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
      },
      inputContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 3,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'column',
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
      table: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        paddingVertical: 10,
        marginBottom: 10,
      },
      headerText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        paddingVertical: 10,
      },
      actionContainer: {
        flexDirection: 'row',
      },
      categoryList: {
        flexGrow: 1,
      },
      categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        paddingVertical: 10,
      },
      categoryName: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      actionButtonEdit: {
        backgroundColor: CUSTOM_COLOR.LightGray,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
      actionButtonDelete: {
        backgroundColor: CUSTOM_COLOR.Red,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor:'#0066FF',    
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      addButtonIcon: {
        color: '#fff',
        fontSize: 24,
      },TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryLightGreyHex,
      },
    
      InputContainerComponent: {
        flexDirection: 'row',
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: CUSTOM_COLOR.LightGray,
        alignItems: 'center',
      },
    
      InputIcon: {
        marginHorizontal: SPACING.space_20,
      },
    

});
    
export default CategoryScreen;