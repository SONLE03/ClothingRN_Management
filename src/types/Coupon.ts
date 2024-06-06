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