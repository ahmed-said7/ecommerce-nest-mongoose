import {IsString,IsEmail,IsNotEmpty} from 'class-validator';
import{Transform} from 'class-transformer';
export class updateUserPasswordDto {

    @IsString()
    @IsNotEmpty()
    confirmPassword:string;

    @IsEmail()
    @IsNotEmpty()
    currentPassword:string;

    @IsString()
    @IsNotEmpty()
    password:string;
    
};