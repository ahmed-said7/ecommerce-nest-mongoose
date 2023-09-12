
import {IsString,IsEmail,IsNotEmpty,IsDate, IsNumber} from 'class-validator';

export class ChangePasswordDto {

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    passwordConfirm:string;

    
    
}