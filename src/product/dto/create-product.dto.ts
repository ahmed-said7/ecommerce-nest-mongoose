import { Transform } from "class-transformer";
import { IsString,IsNumber,IsArray,IsNotEmpty,Min,MAX,IsOptional } from "class-validator";
Transform

export class CreateProductDto{
    @IsString()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    @IsOptional()
    @Transform(({value})=> value*1)
    quantity:number;

    @IsNumber()
    @Transform(({value})=> value*1)
    price:number;

    @IsNumber()
    @IsOptional()
    sold:number;

    @IsNumber()
    @IsOptional()
    averageRating:number;

    @IsArray()
    @IsOptional()
    images:string[];

    @IsString()
    @IsOptional()
    coverImage:string;

    @IsString()
    category: string;

    @IsArray()
    subcategories: string[];

}