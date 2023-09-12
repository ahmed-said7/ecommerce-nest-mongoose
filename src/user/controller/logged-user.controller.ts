import { Controller,Post,Get,Body,Delete,ParseIntPipe,Param,UseInterceptors,UseGuards,NotFoundException,Patch} from "@nestjs/common";
import { CurrentUserDecorator } from "../decorator/current-user.decorator";
import { UserService } from "../services/user.service";
import { UserInterface } from "../interface/user-interface.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { updateUserPasswordDto } from "../dto/update-password.dto";
import { User } from "../models/user.entity";


@Controller('/logged-user')

export class LoggedUserController {
    constructor (private UserService:UserService){};
    
    @Get("/")
    getOne(@CurrentUserDecorator() user:User){
        return user;
    }

    @Patch("/password")
    updateLoggedUserPassword(@CurrentUserDecorator() user:UserInterface,@Body() Body:updateUserPasswordDto){
        return this.updateLoggedUserPassword(user,Body);
        
    }

    @Patch("/user")
    async updateLoggedUser(@CurrentUserDecorator() user:UserInterface,@Body() Body:UpdateUserDto){
        const updatedUser= this.UserService.updateOne(user._id,Body);
        return updatedUser;
    }

    @Delete()
    async DeleteLoggedUser(@CurrentUserDecorator() user:UserInterface){
        return this.UserService.deleteOne(user._id);
    }

}