import {IsString,IsNotEmpty, IsOptional} from "class-validator";

export class CreateBrandDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsOptional()
    @IsString()
    image:string;
};