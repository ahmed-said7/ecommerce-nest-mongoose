import { Controller,Post,Get,Body,Delete,ParseIntPipe,Param,UseInterceptors,UseGuards,NotFoundException} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/login.dto";
import { UserService } from "../services/user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { SerializeUserDto } from "../dto/serialize-user.dto";
import { SerializeInterceptor } from "src/interceptor/seralize.auth.interceptor";
import { CurrentUserDecorator } from "../decorator/current-user.decorator";
import { User } from "../models/user.entity";
// import { AuthGuard } from "src/guards/auth.guard";
import { UserGuard } from "src/guards/user.guard";
import { UserInterface } from "../interface/user-interface.dto";
import { updateUserPasswordDto } from "../dto/update-password.dto";


@Controller('/auth')
// @UseInterceptors(new SerializeInterceptor(SerializeUserDto))

export class AuthController {
    constructor (private AuthService: AuthService,private UserService:UserService){}
    
    @Post("/signup")
    // @UseInterceptors(new SerializeInterceptor(SerializeUserDto))
    signup(@Body() body:CreateUserDto){
        return this.AuthService.signup(body);
    }

    @Post("/login")
    
    login(@Body() body:LoginDto){
        return this.AuthService.Login(body);
    }
    
    

}