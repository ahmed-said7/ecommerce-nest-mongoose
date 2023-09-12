import { IsNumber, IsOptional } from "class-validator";
import { Types } from "mongoose"

export class UpdateCartDto {
    @IsOptional()
    Items?:{
        product:Types.ObjectId,
        color:string,
        quantity:number,
        price:number
    };
    
    @IsOptional()
    @IsNumber()
    totalPrice?:number;
    
    @IsOptional()
    @IsNumber()
    totalPriceAfterDiscount?:number;
    
    @IsOptional()
    @IsNumber()
    user?:Types.ObjectId;
};