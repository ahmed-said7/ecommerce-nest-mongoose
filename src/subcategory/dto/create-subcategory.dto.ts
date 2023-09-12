import {IsString,IsNumber} from "class-validator";
export class CreateSubategoryDto{
    @IsString()
    name:string;
    @IsString()
    category:string;
}