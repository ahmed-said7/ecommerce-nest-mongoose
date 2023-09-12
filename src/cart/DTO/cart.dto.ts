import {IsString,IsNumber,IsOptional,IsNotEmpty,IsMongoId, isNotEmpty} from "class-validator";
export class CartRouteDto {
    @IsNotEmpty()
    @IsMongoId()
    product:string;

    @IsNotEmpty()
    @IsString()
    color:string;
};
