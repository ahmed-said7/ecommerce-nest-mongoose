
import {IsString,IsEmail,IsNotEmpty,IsDate, IsNumber} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    
    
}