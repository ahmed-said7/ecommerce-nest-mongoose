import { Types } from "mongoose"

export class CreateCartDto {
    Items?:{
        product:Types.ObjectId,
        color:string,
        quantity:number,
        price:number
    };
    totalPrice?:number;
    totalPriceAfterDiscount?:number;
    user?:string;
};