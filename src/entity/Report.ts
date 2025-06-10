//Reports

//Daily reports
export interface DailyRevenueResponse {
    // date: string;
    TotalCustomers: number;
    TotalOrders: number;
    TotalProducts: number;
    TotalRevenue: number;
}

export interface DailyExpenseResponse {
    date: string;
    totalInvoices: number;
    totalProducts: number;
    totalExpense: number;
}

//Monthly reports
export interface MonthlyRevenue {
  month: number;
  year: number;
  totalCustomers: number;
  totalOrders: number;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface MonthlyExpense {
  month: number;
  year: number;
  totalInvoices: number;
  totalProducts: number;
  totalExpense: number;
}

//Yearly reports
export interface YearlyRevenue {
    year: number;
    totalCustomers: number;
    totalOrders: number;
    totalProductsSold: number;
    totalRevenue: number;
}

export interface YearlyExpense {
    year: number;
    totalInvoices: number;
    totalProducts: number;
    totalExpense: number;
}


export interface Revenue {
    Key: string;
    TotalOrders: number;
    TotalProductsSold: number;
    TotalRevenue: number;
    TotalCustomers: number;
    ProductAnalyticDatas: ProductAnalyticData[];
   
}
export interface ProductAnalyticData{
    ProductName: string;
    TotalProductsSold: number;
}