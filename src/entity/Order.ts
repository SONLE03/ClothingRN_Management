export interface Address {
    Id: string;
    Province: string;
    District: string;
    Ward: string;
    SpecificAddress: string;
    PostalCode: string;
    IsDefault: boolean;
}

export interface Orders {
    Id: string;
    PhoneNumber: string;
    Email: string;
    PaymentMethod: string;
    CanceledAt: string;
    CompletedAt: string;
    DeliveredAt: string;
    Note: string;
    ShippingFee: number;
    OrderStatus: string;
    UserId: string;
    FullName: string | null;
    Address: Address;
    TaxFee: number;
    SubTotal: number;
    Total: number;
    AccountsReceivable: number;
    OrderItemResponses: OrderItemResponse[];
}

export interface OrderItemResponse {
    Id: string;
    ProductId: string;
    ProductName: string | null;
    Dimension: string;
    ColorId: string;
    ColorName: string | null;
    Price: number;
    Quantity: number;
    SubTotal: number;
}

export interface OrderDetail {
    productItem: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}

export interface OrdersAnalysis{
    totalAmount: number,
    distinctProductItemCount: number,
    totalQuantity: number,
}