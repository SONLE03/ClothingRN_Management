// screens/DailyReportScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import { Tab, TabView, Card } from '@ui-kitten/components';
// import { LineChart } from 'react-native-chart-kit';
// import { GetDailyExpense } from '../../api/report/daily-report/GetDailyExpense'; 
// import { GetDailyRevenue } from '../../api/report/daily-report/GetDailyRevenue';
// import { DailyExpenseResponse, DailyRevenueResponse } from '../../types/Report';
import { View } from "react-native";
const DailyReportScreen = ({ navigation }: any ) => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [revenueData, setRevenueData] = useState <DailyRevenueResponse[]>([]);
  // const [expenseData, setExpenseData] = useState <DailyExpenseResponse[]>([]);
  // const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  // const [endDate, setEndDate] = useState(new Date());

  // const fetchData = async () => {
  //   const revenueResponse = await GetDailyRevenue(startDate.toISOString(), endDate.toISOString());
  //   const expenseResponse = await GetDailyExpense(startDate.toISOString(), endDate.toISOString());
  //   setRevenueData(revenueResponse);
  //   setExpenseData(expenseResponse);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [startDate, endDate]);

  // const showDatePicker = (currentMode: string, dateType: string) => {
  //   // DateTimePickerAndroid.open({
  //   //   value: dateType === 'start' ? startDate : endDate,
  //   //   onChange: (event, selectedDate) => {
  //   //     const currentDate = selectedDate || (dateType === 'start' ? startDate : endDate);
  //   //     dateType === 'start' ? setStartDate(currentDate) : setEndDate(currentDate);
  //   //   },
  //   //   //mode: currentMode,
  //   //   is24Hour: true,
  //   // });
  // };

  // const calculateTotal = (data: any[], key: string) => data.reduce((total, item) => total + item[key], 0);

  // const renderCard = (title: string , value: string ) => (
  //   <Card className="flex-1 m-2">
  //     <Text className="text-lg">{title}</Text>
  //     <Text className="text-xl font-bold">{value}</Text>
  //   </Card>
  // );

  return (
    // <View className="flex-1 bg-white">
    //   <View className="flex-row justify-between p-4">
    //     <TouchableOpacity onPress={() => showDatePicker('date', 'start')} className="bg-gray-200 p-2 rounded">
    //       <Text>Start Date: {startDate.toDateString()}</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => showDatePicker('date', 'end')} className="bg-gray-200 p-2 rounded">
    //       <Text>End Date: {endDate.toDateString()}</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <TabView
    //     selectedIndex={selectedIndex}
    //     onSelect={index => setSelectedIndex(index)}
    //   >
    //     <Tab title="Revenue">
    //       <ScrollView className="p-4">
    //         <View className="flex-row">
    //           {renderCard('Total Customers', calculateTotal(revenueData, 'totalCustomers'))}
    //           {renderCard('Total Orders', calculateTotal(revenueData, 'totalOrders'))}
    //           {renderCard('Total Products Sold', calculateTotal(revenueData, 'totalProductsSold'))}
    //         </View>
    //         <LineChart
    //           data={{
    //             labels: revenueData.map(item => item.date.split('T')[0]),
    //             datasets: [{ data: revenueData.map(item => item.totalRevenue) }]
    //           }}
    //           width={400} // from react-native
    //           height={220}
    //           yAxisLabel="$"
    //           chartConfig={{
    //             backgroundColor: '#e26a00',
    //             backgroundGradientFrom: '#fb8c00',
    //             backgroundGradientTo: '#ffa726',
    //             decimalPlaces: 2,
    //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //           }}
    //           style={{
    //             marginVertical: 8,
    //             borderRadius: 16
    //           }}
    //         />
    //       </ScrollView>
    //     </Tab>
    //     <Tab title="Expense">
    //       <ScrollView className="p-4">
    //         <View className="flex-row">
    //           {renderCard('Total Invoices', calculateTotal(expenseData, 'totalInvoices'))}
    //           {renderCard('Total Products', calculateTotal(expenseData, 'totalProducts'))}
    //           {renderCard('Total Expense', calculateTotal(expenseData, 'totalExpense'))}
    //         </View>
    //         <LineChart
    //           data={{
    //             labels: expenseData.map(item => item.date.split('T')[0]),
    //             datasets: [{ data: expenseData.map(item => item.totalExpense) }]
    //           }}
    //           width={400} // from react-native
    //           height={220}
    //           yAxisLabel="$"
    //           chartConfig={{
    //             backgroundColor: '#e26a00',
    //             backgroundGradientFrom: '#fb8c00',
    //             backgroundGradientTo: '#ffa726',
    //             decimalPlaces: 2,
    //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //           }}
    //           style={{
    //             marginVertical: 8,
    //             borderRadius: 16
    //           }}
    //         />
    //       </ScrollView>
    //     </Tab>
    //   </TabView>
    // </View>
    <View>

    </View>
  );
};

export default DailyReportScreen;
