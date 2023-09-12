import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema()
export class Category{
    @Prop({type:String})
    name:string;
}


export const categorySchema=SchemaFactory.createForClass(Category);