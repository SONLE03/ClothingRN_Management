import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    FlatList,
    Image,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUSTOM_COLOR, COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../../../theme/theme';
import { GetAllProducts } from '../../../api/product/product/GetAllProducts';
import { Product } from '../../../types/Product';
import FONT_FAMILY from '../../../consts/fonts';
const ProductScreen = ({navigation} : any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await GetAllProducts();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const filteredProduct = products.filter(products =>
        products.product_Name.toLowerCase().includes(searchText)
    );
    const handleAddProduct = () => {
        navigation.navigate("AddProductScreen")   
    }
    const deleteProduct = async (id : string) => {
        // const result = await DeleteCategory(id);
        // Alert.alert(result);
    }
    const renderItem = ({ item }: { item: Product }) => {
        const handleEdit = () => {
          navigation.navigate('EditProductScreen', {item: item});
        };
    
        const handleDelete = () => {
          Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${item.product_Name}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  deleteProduct(item.id)
                },
              },
            ]
          );
        };
    
        return (
            <TouchableOpacity>
                <View style={styles.accountContainer}>
                    <View style={styles.infoContainer}>
                        <View style={{ width: 10, height: '100%' }} />
                        <View style={styles.avataContainer}>
                        {item.image ? (
                            <Image
                            source={{ uri: item.image }}
                            style={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                            borderRadius: 60,
                            resizeMode: 'center',
                            borderColor: CUSTOM_COLOR.Black,
                            borderWidth: 1,
                            }}
                        />
                        ) : (
                        <Image
                        source={require('../../../assets/user-128-128.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: 1,
                            borderRadius: 60,
                            resizeMode: 'center',
                            borderColor: CUSTOM_COLOR.Black,
                            borderWidth: 1,
                        }}
                        />
                    )}
                    </View>
                        <View style={{ width: 15, height: '100%' }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={[styles.textViewStyles, { fontSize: 20 }]}>
                            {item.product_Name} 
                        </Text>
                        <View style={{ width: '100%', height: 5 }} />
                            <Text style={[styles.textViewStyles, { fontSize: 15 }]}>
                                {item.price} VND
                            </Text>
                        </View>
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
                <View style={styles.spaceContainer} />
            </TouchableOpacity>
        );
      };
      return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Product List</Text>
            </TouchableOpacity>
            <View style={styles.InputContainerComponent}>
                <TouchableOpacity>
                    <MaterialComunityIcons
                    name="home-search"
                    size={25}
                    style={styles.InputIcon}
                    />
                </TouchableOpacity>

                <TextInput placeholder='Find your products here...' 
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
        <View style={styles.spaceContainer} />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            
            <View style={styles.table}>
                <FlatList
                    data={filteredProduct}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
          )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
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
      TextInputContainer: {
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
      accountContainer: {
        flex: 4,
        flexDirection: 'row',
      },
      infoContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      avataContainer: {
        width: '33%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      },
      textViewStyles: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 15,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black,
      },
      viewShopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      spaceContainer: {
        width: '100%',
        height: 5,
        backgroundColor: CUSTOM_COLOR.LightGray,
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
});
    
export default ProductScreen;