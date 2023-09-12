import {Document} from "mongoose";
export interface UserInterface extends Document {
    name:string;
    email:string;
    password:string;
    passwordChangedAt:number;
    resetCode:string;
    resetCodeExpiredAt:number;
    resetCodeVertified:boolean;
    role:string;
}
