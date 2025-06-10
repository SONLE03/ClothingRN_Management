export interface Coupon{
    Id : string,
    Code : string,
    ImageSource : string,
    Description : string,
    Quantity : number,
    UsageCount : number,
    MinOrderValue : number,
    DiscountValue : number,
    StartDate : string,
    EndDate : string,
    ECouponType : string,
    ECouponStatus : string
}

export interface NewCoupon {
    name: string;
    startDate: string;
    endDate: string;
    discountValue: number;
    minimumBill: number;
    quantity: number;
    status: number;
}