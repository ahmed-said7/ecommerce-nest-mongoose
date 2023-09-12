import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "./user.service";
import {Injectable,NotFoundException,BadRequestException,UseGuards, Body} from "@nestjs/common";
import {config} from "dotenv";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs"
import { LoginDto } from "../dto/login.dto";
import { CurrentUserDecorator } from "../decorator/current-user.decorator";
import { updateUserPasswordDto } from "../dto/update-password.dto";
import { UserInterface } from "../interface/user-interface.dto";
config()

@Injectable()
export class AuthService {
    constructor(private UserService: UserService){};
    async signup(body:CreateUserDto){
        let [user]=await this.UserService.findAll({email : body.email});
        if(user){

            return new NotFoundException('email should be unique');
        }
        user = await this.UserService.createOne(body);
        const token=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:"3d"});
        return {user,token,status:"Success"};
    }
    async Login( body : LoginDto ){
        const [user] = await this.UserService.findAll({email:body.email});
        if(!user){
            return new BadRequestException('no user found');
        }
        let valid=await bcrypt.compare(body.password,user.password);
        if(!valid){
            return new BadRequestException('password mismatch');
        }
        const token=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:"3d"});
        return {user,token,status:"Success"};
    }
    async UpdatePassword(user:UserInterface,body:updateUserPasswordDto){
        const valid= await bcrypt.compare(user.password,user.password);
        if(!valid) return new BadRequestException('Invalid password provided');
        if(body.confirmPassword != body.password) return new BadRequestException('Invalid password provided');
        return this.UserService.updateOne(
            user._id,{passwordChangedAt:Date.now(),password:body.password})
    }
}