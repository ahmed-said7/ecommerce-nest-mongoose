import {IsString,IsNumber,IsOptional} from "class-validator";
export class UpdateSubategoryDto{
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    category:string;
}