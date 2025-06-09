//Reports

//Daily reports
export interface DailyRevenueResponse {
    date: string;
    totalCustomers: number;
    totalOrders: number;
    totalProductsSold: number;
    totalRevenue: number;
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
