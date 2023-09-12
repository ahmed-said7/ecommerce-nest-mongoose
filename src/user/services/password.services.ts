import { UserService } from "./user.service";
import {Injectable,NotFoundException,BadRequestException} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {config} from "dotenv";
import {randomBytes,scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import { ForgetPasswordDto } from "../dto/forget-password.dto";
import { ResetCodeDto } from "../dto/reset-code.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
const scrypt=promisify(_scrypt);

config()

@Injectable()
export class PasswordService {
    constructor(private UserService: UserService,private MailerService:MailerService){};
    async forgetPassword(body:ForgetPasswordDto){
        let [user]=await this.UserService.findAll({email:body.email});
        if(!user) return new NotFoundException('User not found');
        const resetCode = `${Math.floor((Math.random()*1000000)+1)}`;
        const salt=randomBytes(8).toString('hex');
        const hash=(await scrypt(resetCode,salt,32)) as Buffer;
        user.resetCode=hash.toString('hex')+'|'+salt;
        user.resetCodeExpiredAt=Date.now()+ 10*60*1000;
        user.resetCodeVertified=false;
        console.log(resetCode,"@@@@@@@ddddddddddddddddddddddd");
        try{
            await this.MailerService.sendMail({
                from:"e-shop",
                to:user.email,
                subject:`welcome mr ${user.name} , you need to reset your password`,
                text:`your verification code is now ${resetCode}`
            })
        }catch(err) {
            console.log(err);
            user.resetCode=undefined;
            user.resetCodeExpiredAt=undefined;
            user.resetCodeVertified=undefined;
        }
        await user.save();
        return {status: 'success'};
    };
    async vertifyCode(body:ResetCodeDto){
        let [user]=await this.UserService.findAll({email:body.email});
        if(!user) return new NotFoundException('User not found');
        const [storedHash,salt]=user.resetCode?.split('|');
        const hash=(await scrypt(body.resetCode,salt,32)) as Buffer;
        if(storedHash !== hash.toString('hex')) return new BadRequestException('resetcode not correctly encoded');
        if(Date.now()>user.resetCodeExpiredAt) return new BadRequestException("resetcode expired")
        user.resetCode=undefined;
        user.resetCodeExpiredAt=undefined;
        user.resetCodeVertified=true;
        await user.save();
        return {status: 'success'};
    };
    async changePassword(body:ChangePasswordDto){
        let [user]=await this.UserService.findAll({email:body.email});
        if(!user) return new NotFoundException('User not found');
        if(!user.resetCodeVertified) return new BadRequestException("go and vertify resetcode ");
        if(body.password!=body.passwordConfirm) return new BadRequestException('password mismatch');
        user.resetCodeVertified=undefined;
        user.password=body.password;
        await user.save();
        return {status: 'success'};
    };
};