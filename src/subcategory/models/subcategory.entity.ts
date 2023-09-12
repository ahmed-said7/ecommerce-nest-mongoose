import { Category } from "src/category/models/category.entity";
import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema()
export class Subcategory{
    @Prop({type:String})
    name:string;
    
    @Prop({type:mongoose.Schema.ObjectId, ref:"Category"})
    category:mongoose.Schema.Types.ObjectId;
}

export const subcategorySchema=SchemaFactory.createForClass(Subcategory);