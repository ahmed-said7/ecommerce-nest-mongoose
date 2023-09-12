
import {IsString,IsEmail,IsNotEmpty,IsDate, IsNumber} from 'class-validator';

export class ForgetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
}