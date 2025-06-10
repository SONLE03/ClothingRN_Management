import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert, Dimensions} from 'react-native';
import {Tab, TabView, Card, Datepicker, Layout} from '@ui-kitten/components';
import {LineChart} from 'react-native-chart-kit';
import {GetDailyExpense} from '../../api/report/daily-report/GetDailyExpense';
import {GetDailyRevenue} from '../../api/report/daily-report/GetDailyRevenue';
import {GetRevenue} from '../../api/report/daily-report/GetRevenue';
import { Revenue } from '../../entity/Report';
import {DailyExpenseResponse, DailyRevenueResponse} from '../../entity/Report';
import HeaderBar from '../../components/HeaderBar';

const screenWidth = Dimensions.get('window').width;

const DailyReportScreen = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [expenseData, setExpenseData] = useState<DailyExpenseResponse[]>([]);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const revenueResponse = await GetRevenue(
        startDate.toISOString(),
        endDate.toISOString(),
      );
      setRevenueData(revenueResponse.data);
      // setExpenseData(expenseResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const calculateTotal = (data: any[], key: string) =>
    data.reduce((total, item) => total + item[key], 0);

  const renderCard = (title: string, value: number) => (
    <Card
      className="border border-orange-600 rounded-xl p-1"
      style={{flex: 1, margin: 2}}>
      <Text className="text-gray-700" style={{fontSize: 16}}>
        {title}
      </Text>
      <Text
        className="text-gray-700"
        style={{fontSize: 18, fontWeight: 'bold'}}>
        {value}
      </Text>
    </Card>
  );

  const renderChart = (data: any[]) => {
  if (data.length === 0) {
    return <Text className="text-gray-700">No data available</Text>;
  }
    console.log(data);
  return (
      <LineChart
        data={{
          labels: data.map(item => item.Key), // Sử dụng Key cho trục x
          datasets: [{ data: data.map(item => item.TotalRevenue || 0) }], // Sử dụng TotalRevenue cho trục y
        }}
        width={screenWidth - 20} // Trừ padding
        height={220}
        yAxisLabel="đ"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // Do TotalRevenue là số nguyên
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10, // Giảm kích thước nhãn nếu Key dài
            rotation: 45, // Xoay nhãn để tránh chồng lấn
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };

  // Function to format date to include only day and month
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar title="Daily Report" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <Layout style={{flex: 1, marginRight: 8}}>
          <Datepicker
            date={startDate}
            onSelect={nextDate => setStartDate(nextDate)}
            label="Start Date"
          />
        </Layout>
        <Layout style={{flex: 1, marginLeft: 8}}>
          <Datepicker
            date={endDate}
            onSelect={nextDate => setEndDate(nextDate)}
            label="End Date"
          />
        </Layout>
      </View>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title="Revenue">
          <ScrollView style={{padding: 16}}>
            <View className="flex flex-col space-y-4">
              {renderCard(
                'Total Revenue',
                calculateTotal(revenueData, 'TotalRevenue'),
              )}
              {renderCard(
                'Total Customers',
                calculateTotal(revenueData, 'TotalCustomers'),
              )}
              {renderCard(
                'Total Orders',
                calculateTotal(revenueData, 'TotalOrders'),
              )}
              {renderCard(
                'Total Products Sold',
                calculateTotal(revenueData, 'TotalProductsSold'),
              )}
            </View>
            {renderChart(revenueData)}
          </ScrollView>
        </Tab>
      </TabView>
    </View>
  );
};

export default DailyReportScreen;
