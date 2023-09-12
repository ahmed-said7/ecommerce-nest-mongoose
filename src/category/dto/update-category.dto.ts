import {IsString,IsNumber,IsOptional} from "class-validator";
export class UpdateCategoryDto{
    @IsOptional()
    @IsString()
    name:string;
}