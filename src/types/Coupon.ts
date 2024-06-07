export interface Coupon{
    id : string,
    name : string,
    startDate : Date,
    endDate : Date,
    discountValue : number,
    minimumBill : number,
    quantity : number,
    eventStatus: string
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