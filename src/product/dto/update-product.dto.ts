import { IsString,IsNumber,IsArray,IsNotEmpty,Min,MAX,IsOptional } from "class-validator";


export class UpdateProductDto{
    
    @IsOptional()
    @IsString()
    name:string   
    @IsOptional()
    @IsString()
    description:string;
    
    @IsOptional()
    @IsNumber()
    quantity:number;
    
    @IsOptional()
    @IsNumber()
    price:number
    
    @IsOptional()
    @IsNumber()
    sold:number

    @IsOptional()
    @IsNumber()
    averageRating:number;
    
    @IsOptional()
    @IsArray()
    images:string[];
    
    @IsOptional()
    @IsString()
    coverImage:string;
    
    @IsOptional()
    @IsString()
    category: string;
    
    @IsOptional()
    @IsString()
    subcategories: string[];

}