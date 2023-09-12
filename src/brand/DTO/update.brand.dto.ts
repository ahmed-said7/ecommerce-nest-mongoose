import {IsString,IsOptional} from "class-validator";

export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    name:string;
}