import { Role } from 'src/enums/enum.role';
import {PrimaryGeneratedColumn,Column,Entity,BeforeInsert,BeforeUpdate,AfterLoad, AfterUpdate, Timestamp} from 'typeorm';
// import * as bcrypt from "bcryptjs";
import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

@Schema()
export class User {

    @Prop({type:String})
    name:string;

    @Prop({type:String,unique: true})
    email:string;

    @Prop({type:String})
    password:string;

    @Prop({type:Date})
    passwordChangedAt: number;
    
    @Prop({type:String})
    resetCode:string;

    @Prop({type:Date})
    resetCodeExpiredAt:number;

    @Prop({type:Boolean})
    resetCodeVertified:boolean;
    
    @Prop({type:String,enum:['user','admin','manager'],default:"user"})
    role:string;
};


export const userSchema=SchemaFactory.createForClass(User);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    return next();
})