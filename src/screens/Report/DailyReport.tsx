import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Tab, TabView, Card, Datepicker, Layout } from '@ui-kitten/components';
import { LineChart } from 'react-native-chart-kit';
import { GetDailyExpense } from '../../api/report/daily-report/GetDailyExpense'; 
import { GetDailyRevenue } from '../../api/report/daily-report/GetDailyRevenue';
import { DailyExpenseResponse, DailyRevenueResponse } from '../../types/Report';

const DailyReportScreen = ({ navigation }: any ) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revenueData, setRevenueData] = useState<DailyRevenueResponse[]>([]);
  const [expenseData, setExpenseData] = useState<DailyExpenseResponse[]>([]);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    const revenueResponse = await GetDailyRevenue(startDate.toISOString(), endDate.toISOString());
    const expenseResponse = await GetDailyExpense(startDate.toISOString(), endDate.toISOString());
    setRevenueData(revenueResponse);
    setExpenseData(expenseResponse);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const calculateTotal = (data: any[], key: string) => data.reduce((total, item) => total + item[key], 0);

  const renderCard = (title: string, value: number) => (
    <Card style={{ flex: 1, margin: 2 }}>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Layout style={{ flex: 1, marginRight: 8 }}>
          <Datepicker
            date={startDate}
            onSelect={nextDate => setStartDate(nextDate)}
            label='Start Date'
          />
        </Layout>
        <Layout style={{ flex: 1, marginLeft: 8 }}>
          <Datepicker
            date={endDate}
            onSelect={nextDate => setEndDate(nextDate)}
            label='End Date'
          />
        </Layout>
      </View>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <Tab title="Revenue">
          <ScrollView style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              {renderCard('Total Customers', calculateTotal(revenueData, 'totalCustomers'))}
              {renderCard('Total Orders', calculateTotal(revenueData, 'totalOrders'))}
              {renderCard('Total Products Sold', calculateTotal(revenueData, 'totalProductsSold'))}
            </View>
            <LineChart
              data={{
                labels: revenueData.map(item => item.date.split('T')[0]),
                datasets: [{ data: revenueData.map(item => item.totalRevenue) }]
              }}
              width={400} // from react-native
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </ScrollView>
        </Tab>
        <Tab title="Expense">
          <ScrollView style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              {renderCard('Total Invoices', calculateTotal(expenseData, 'totalInvoices'))}
              {renderCard('Total Products', calculateTotal(expenseData, 'totalProducts'))}
              {renderCard('Total Expense', calculateTotal(expenseData, 'totalExpense'))}
            </View>
            <LineChart
              data={{
                labels: expenseData.map(item => item.date.split('T')[0]),
                datasets: [{ data: expenseData.map(item => item.totalExpense) }]
              }}
              width={400} // from react-native
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </ScrollView>
        </Tab>
      </TabView>
    </View>
  );
};

export default DailyReportScreen;
