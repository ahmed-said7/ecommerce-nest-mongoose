
import {IsString,IsEmail,IsNotEmpty,IsDate, IsNumber} from 'class-validator';

export class ResetCodeDto {

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    resetCode:string;

    
    
}