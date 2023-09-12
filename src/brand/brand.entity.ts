import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Brand extends Document {
    @Prop({required:true,type:String})
    name:string;

    @Prop({type:String})
    image:string;
}




export const brandSchema=SchemaFactory.createForClass(Brand);


brandSchema.post('init',function(doc){
    if(doc.image){
        doc.image=`http://localhost:4000/brand/${doc.image}`;
    }
})