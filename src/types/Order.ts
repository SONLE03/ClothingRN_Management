export interface Orders {
    orderId: string;
    orderDate: string;
    total: number;
    customerId: string;
    customerName: string;
    customerPhone: string;
    status: string;
}

export interface OrderDetail {
    productItem: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}