import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tab, TabView} from '@ui-kitten/components';
import {GetAllOrderByCustomer} from '../../api/order/GetAllOrderByCustomer';
import {Orders, OrderDetail} from '../../entity/Order';
import {GetOrderDetails} from '../../api/order/OrderDetails';
import HeaderBar from '../../components/HeaderBar';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {UpdateOrderStatus} from '../../api/order/UpdateOrderStatus';
import {DataTable} from 'react-native-paper';
const CustomerOrderScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await GetAllOrderByCustomer(item.id);
      setOrders(orders);
    };
    fetchOrders();
  }, []);
  const handleOrderClick = async (order: Orders) => {
    setSelectedOrder(order);
    const details = await GetOrderDetails(order.orderId);
    setOrderDetails(details);
    setModalVisible(true);
  };
  const renderTabContent = () => {
    return (
      <ScrollView className="p-4">
        {orders.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Image
              source={require('../../assets/no-order.png')}
              style={{width: 200, height: 200}}
            />
            <Text className="text-center text-lg text-gray-600 font-semibold mt-4">
              You don't have any available orders here
            </Text>
          </View>
        ) : (
          orders.map(order => (
            <TouchableOpacity
              key={order.orderId}
              className="mb-4 border p-4 rounded-2xl bg-white"
              onPress={() => handleOrderClick(order)}>
              <View className="flex-row justify-between items-center border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-gray-500">
                  <Ionicons name="calendar-outline" size={20} color="black" />{' '}
                  Order Date:
                </Text>
                <Text className="text-gray-600">
                  {new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // Use 24-hour format
                  }).format(new Date(order.orderDate))}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-2 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-gray-500">
                  {' '}
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="black"
                  />{' '}
                  Customer Name:
                </Text>
                <Text className="text-gray-600">{order.customerName}</Text>
              </View>

              <View className="flex-row justify-between items-center mt-2 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-gray-500">
                  <Ionicons name="call-outline" size={20} color="black" />{' '}
                  Customer Phone:
                </Text>
                <Text className="text-gray-600">{order.customerPhone}</Text>
              </View>

              <View className="flex-row justify-between items-center mt-2 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-gray-500">
                  <Ionicons name="cash-outline" size={20} color="black" /> Total
                  bills:
                </Text>
                <Text className="text-gray-600">{order.total}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <Text className="flex-row text-2xl font-semibold space-x-2 text-black">
          <MaterialComunityIcons
            className="mr-2"
            name="format-color-fill"
            size={30}
            color="#333"
          />
          Order History
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <TabView
        className="p-2"
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}>
        <Tab
          title={<Text className="text-green-500">Completed</Text>}
          className="h-20 text-green-500"
          icon={<Ionicons name="checkmark-circle" size={24} color="green" />}>
          {renderTabContent()}
        </Tab>
      </TabView>

      <Modal visible={modalVisible} animationType="slide">
        <View className="p-4 flex-1">
          <View className="flex-row justify-center items-center bg-orange-500 h-12 rounded-2xl p-2">
            <Text className="text-xl font-bold text-center text-white ">
              <Ionicons name="sparkles" size={25} color="white" /> Order Details
            </Text>
          </View>

          {selectedOrder && (
            <>
              <View className="flex-row justify-between items-center border border-b-gray-300 border-x-white border-t-white mt-16">
                <Text className="font-bold text-lg text-gray-600">
                  <Ionicons name="calendar-outline" size={20} color="black" />{' '}
                  Order Date:
                </Text>
                <Text className="text-gray-600 text-lg">
                  {new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // Use 24-hour format
                  }).format(new Date(selectedOrder.orderDate))}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-6 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-lg text-gray-600">
                  {' '}
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="black"
                  />{' '}
                  Customer Name:
                </Text>
                <Text className="text-gray-600 text-lg">
                  {selectedOrder.customerName}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-6 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-lg text-gray-600">
                  <Ionicons name="call-outline" size={20} color="black" />{' '}
                  Customer Phone:
                </Text>
                <Text className="text-gray-600 text-lg">
                  {selectedOrder.customerPhone}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-6 border border-b-gray-300 border-x-white border-t-white">
                <Text className="font-bold text-lg text-gray-600">
                  <Ionicons name="cash-outline" size={20} color="black" /> Total
                  bills:
                </Text>
                <Text className="text-gray-600 text-lg">
                  {selectedOrder.total}
                </Text>
              </View>
            </>
          )}
          <DataTable className="mt-8 border border-gray-400 rounded-xl font-semibold text-lg text-center p-1 ">
            <DataTable.Header>
              <DataTable.Title
                className="flex justify-start"
                textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
                Product Name
              </DataTable.Title>
              <DataTable.Title
                className="flex justify-center"
                textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
                Quantity
              </DataTable.Title>
              <DataTable.Title
                className="flex justify-center"
                textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
                Price
              </DataTable.Title>
              <DataTable.Title
                className="flex justify-end"
                textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
                Total
              </DataTable.Title>
            </DataTable.Header>
            {orderDetails.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.productName}</DataTable.Cell>
                <DataTable.Cell className="flex justify-center">
                  {item.quantity}
                </DataTable.Cell>
                <DataTable.Cell className="flex justify-center">
                  {item.price}
                </DataTable.Cell>
                <DataTable.Cell className="flex justify-end">
                  {item.total}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <TouchableOpacity
            className="flex flex-row justify-center items-center h-12 bg-orange-500 p-2 rounded-xl mt-8"
            onPress={() => setModalVisible(false)}>
            <Text className="text-white font-bold text-lg">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default CustomerOrderScreen;
