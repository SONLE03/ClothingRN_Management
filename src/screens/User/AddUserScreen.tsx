import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Dialog} from 'react-native-paper';
import {AddStaff} from '../../api/users/AddStaff';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GetUser} from '../../api/users/get-user';
import {UserProps} from '../../entity/User';

const AddUserScreen = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);
  const hideDialog = () => setVisible(false);

  const clearFields = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setPassword('');
  };

  const handleAddStaff = async () => {
    setLoading(true);
    try {
      if (email === '' || fullName === '' || phone === '' || password === '') {
        Alert.alert('Lack of information');
      } else {
        const response = await AddStaff(email, fullName, phone, password);
        if (!response) {
          Alert.alert('Failed to create staff');
          clearFields();
        } else {
          console.log(response);
          setVisible(true);
          clearFields();
          setLoading(false);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.error('Failed to create staff:', error);
      } else {
        console.error('An unknown error occurred:', error);
      }
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('@gmail.com')) {
      return true; // Invalid email
    }
    return false; // Valid email
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return true; // Invalid phone number
    }
    return false; // Valid phone number
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f0f0', padding: 16}}>
      <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <View className="flex-row space-x-2 space-y-0 ">
          <MaterialIcons
            className="mr-2 mt-2"
            name="person-add"
            size={30}
            color="#333"
          />
          <Text className="ml-2  text-2xl font-semibold text-black">
            Add Staff
          </Text>
        </View>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <View className="flex-col mb-6 h-[600] w-full border border-gray-400 rounded-xl p-4 bg-white">
        <View style={styles.inputContainer}>
          <Text className="text-gray-700" style={styles.label}>
            Email <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, validateEmail(email) && styles.errorInput]}
            placeholder="Enter email.."
            onChangeText={text => setEmail(text)}
            value={email}
            className="text-gray-700"
          />
          {validateEmail(email) && (
            <Text style={styles.errorText}>
              Note: Email must have tag @gmail.com
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text className="text-gray-700" style={styles.label}>
            Full name <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            className="border border-orange-500 rounded-lg p-2 text-gray-700"
            //style={[styles.input, fullName === '' && styles.errorInput]}
            placeholder="Enter full name.."
            onChangeText={text => setFullName(text)}
            value={fullName}
          />
          {/* {fullName === '' && <Text style={styles.errorText}>Full name is required</Text>} */}
        </View>
        <View style={styles.inputContainer}>
          <Text className="text-gray-700" style={styles.label}>
            Phone <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            className="text-gray-700"
            style={[styles.input, validatePhone(phone) && styles.errorInput]}
            placeholder="Enter phone.."
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
            value={phone}
          />
          {validatePhone(phone) && (
            <Text style={styles.errorText}>
              Note: Phone must begin with 0 and min 10 digits
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text className="text-gray-700" style={styles.label}>
            Password <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            className="border border-orange-500 rounded-lg p-2 text-gray-700"
            //style={[styles.input, password === '' && styles.errorInput]}
            placeholder="Enter password.."
            onChangeText={text => setPassword(text)}
            value={password}
          />
          {/* {password === '' && <Text style={styles.errorText}>Password is required</Text>} */}
        </View>
        <Button
          mode="contained"
          style={{marginTop: 20}}
          onPress={handleAddStaff}
          className="bg-orange-500">
          Save staff
        </Button>
        <Dialog
          style={{backgroundColor: '#F0FFF4'}}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Icon icon="sticker-check-outline" size={35} color="green" />
          <Dialog.Title
            style={{textAlign: 'center', color: 'green', fontWeight: 'bold'}}>
            Staff added successfully!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{textAlign: 'center', color: 'green'}}>
              Congratulation! You have successfully added a new staff!
            </Text>
          </Dialog.Content>
        </Dialog>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default AddUserScreen;
