import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../../components/CustomButton';
import { GetAllCategory } from "../../../api/category/category/GetAllCategory";
import { GetAllBranch } from "../../../api/category/branch/GetAllBranch";
import { GetAllSize } from "../../../api/product/size/GetAllSize";
import { GetAllColor } from "../../../api/product/color/GetAllColor";
import { Branch, Category } from "../../../types/Category";
import { Color, Size } from "../../../types/Product";
const AddProductScreen = ({navigation} : any) => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [branch, setBranch] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [isFocusCate, setIsFocusCate] = useState(false);  
    const [isFocusBranch, setIsFocusBranch] = useState(false); 
    const [isFocusSize, setIsFocusSize] = useState(false); 
    const [isFocusColor, setIsFocusColor] = useState(false); 
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const sizeData = await GetAllSize();
            const branchData = await GetAllBranch();
            const cateData = await GetAllCategory();
            const colorData = await GetAllColor();
            setSizes(sizeData);
            setColors(colorData);
            setBranches(branchData);
            setCategories(cateData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const handleAddProduct = () => {

    }
    const handleDeleteItem = (index : any) => {

    }
    const renderAttributeItem = ({ item , index } : any) => (
        <View style={styles.attributeItem}>
          <Text>Size: {item.size}</Text>
          <Text>Color: {item.color}</Text>
          <TouchableOpacity onPress={() => handleDeleteItem(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
    );
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Add Product</Text>
            </TouchableOpacity>
            <ScrollView>
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
                    <Text style={styles.titleInputStyle}>Name Of Product</Text>
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
                        setName(text);
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
                    <Text style={styles.titleInputStyle}>Description</Text>
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
                        setDescription(text);
                    }}
                    value={description}
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
                    <Text style={styles.titleInputStyle}>Price</Text>
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
                        setPrice(text);
                    }}
                    keyboardType='phone-pad'
                    value={price}
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
                    <Text style={styles.titleInputStyle}>Category</Text>
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
                        isFocusCate && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={categories}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocusCate ? 'Select item' : '...'}
                        value={category}
                        onFocus={() => setIsFocusCate(true)}
                        onBlur={() => setIsFocusCate(false)}
                        onChange={item => {
                            setCategory(item.id as never);
                            setIsFocusCate(false);
                        }}
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
                    <Text style={styles.titleInputStyle}>Branch</Text>
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
                        isFocusBranch && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={branches}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocusBranch ? 'Select item' : '...'}
                        value={branch}
                        onFocus={() => setIsFocusBranch(true)}
                        onBlur={() => setIsFocusBranch(false)}
                        onChange={item => {
                            setBranch(item.id as never);
                            setIsFocusBranch(false);
                        }}
                    />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <>
                <View style={[styles.inputContainer, { height: 200 }]}>
                    <View style={{ width: '100%', height: 10 }} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                        <View style={{ width: '5%', height: '100%' }} />
                        <Text style={styles.titleInputStyle}>Attribute (Color and Size)</Text>
                        <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>*</Text>
                    </View>
                    </View>

                    <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ width: '5%', height: '100%' }} />
                    <Dropdown
                        style={[
                        styles.comboType,
                        isFocusColor && { borderColor: 'blue' },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={colors}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocusColor ? 'Select item' : '...'}
                        value={color}
                        onFocus={() => setIsFocusColor(true)}
                        onBlur={() => setIsFocusColor(false)}
                        onChange={item => {
                        setColor(item.id as never);
                        setIsFocusColor(false);
                        }}
                    />
                    <View style={{ width: '5%', height: '100%' }} />
                    </View>

                    <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ width: '5%', height: '100%' }} />
                    <Dropdown
                        style={[
                        styles.comboType,
                        isFocusSize && { borderColor: 'blue' },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={sizes}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocusSize ? 'Select item' : '...'}
                        value={size}
                        onFocus={() => setIsFocusSize(true)}
                        onBlur={() => setIsFocusSize(false)}
                        onChange={item => {
                        setSize(item.id as never);
                        setIsFocusSize(false);
                        }}
                    />
                    <View style={{ width: '5%', height: '100%' }} />
                    </View>

                    <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={handleAddProduct}>
                    <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
                </>
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />
            <CustomButton label={'Save'} onPress={handleAddProduct} />
            </ScrollView>
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
      button: {
        width: 120,
        height: 40,
        backgroundColor: CUSTOM_COLOR.LightBlue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      attributeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        marginBottom: 5,
      },
      deleteButton: {
        color: 'red',
      },

})
export default AddProductScreen;