import { Category } from "src/category/models/category.entity";

// import { Subategory } from "src/subcategory/subcategory.entity";

import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import * as mongoose from "mongoose";

@Schema()

export class Product{

    @Prop({type:String})
    name:string;

    @Prop({type:String})
    description:string;

    @Prop({type:Number})
    quantity:number;
    
    
    @Prop({type:Number})
    price:number;

    @Prop({type:Number})
    sold:number;

    @Prop({type:Number})
    averageRating:number;

    @Prop({type:String})
    coverImage:string;

    @Prop({type:[String]})
    images:string[];

    // @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Category"})
    // category:mongoose.Schema.Types.ObjectId;

    // @Prop({type:[mongoose.Schema.Types.ObjectId],ref:"Subcategory"})
    // subcategories: mongoose.Schema.Types.ObjectId[];

}

export const productSchema=SchemaFactory.createForClass(Product);