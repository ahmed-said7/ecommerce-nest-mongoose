import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import {Document,Types} from "mongoose";

@Schema()
export class Cart extends Document {
    @Prop({required:true,
        type:[{productId:{type:Types.ObjectId,ref:"Product"},
        price:Number,color:String,quantity:{type:Number,default:1}}]
    })
    Items:
    {
    productId:string,
    price:number,color:string,
    quantity:number
    }[];
    @Prop({type:Number,required:true})
    totalPrice:number;
    @Prop({type:Number})
    priceAfterDiscount:number;
    @Prop({type:Types.ObjectId,ref:"User"})
    user:Types.ObjectId
}

export const cartSchema=SchemaFactory.createForClass(Cart);