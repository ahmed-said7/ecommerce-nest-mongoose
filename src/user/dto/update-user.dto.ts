import {IsString,IsEmail,IsNotEmpty,IsOptional,IsDate, IsNumber} from 'class-validator';

export class UpdateUserDto {
    
    
    @IsString()
    @IsOptional()
    name?:string;

    
    @IsEmail()
    @IsOptional()
    email?:string;
    
    
    @IsString()
    @IsOptional()
    password?:string;
    
    
    @IsNumber()
    @IsOptional()
    passwordChangedAt?:number;

};