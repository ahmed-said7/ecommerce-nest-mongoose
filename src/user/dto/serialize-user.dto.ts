import { Role } from "src/enums/enum.role";
import {Expose,Transform,Exclude} from "class-transformer";
import {IsString,IsNumber} from 'class-validator'
export class SerializeUserDto {
    @IsString()
    @Expose()
    _id:string;

    @IsString()
    @Expose()
    name:string;

    @IsString()
    @Expose()
    email:string;

    @IsString()
    @Expose()
    role:Role;

    @Exclude()
    password:string;
    
};