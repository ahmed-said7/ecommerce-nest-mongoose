import { Controller,Post,Get,Body,Delete,ParseIntPipe,Param,UseInterceptors,UseGuards,NotFoundException} from "@nestjs/common";

import { PasswordService } from "../services/password.services";
import { ForgetPasswordDto } from "../dto/forget-password.dto";
import { ResetCodeDto } from "../dto/reset-code.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";


@Controller('/password')

export class PasswordController {
    constructor (private PasswordService: PasswordService){};
    @Post('/forget-password')
    forgotPassword(@Body() body:ForgetPasswordDto){
        return this.PasswordService.forgetPassword(body)
    }
    @Post('/verify-code')
    vertifyCode(@Body() body : ResetCodeDto ){
        return this.PasswordService.vertifyCode(body)
    }

    @Post('/change-password')
    changePassword(@Body() body : ChangePasswordDto ){
        return this.PasswordService.changePassword(body)
    }

}