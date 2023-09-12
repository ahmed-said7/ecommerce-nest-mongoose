import { Controller,Get,Body,Param,
    Post,Delete,Patch, UseGuards } from "@nestjs/common";
import { UserGuard } from "src/guards/user.guard";
import { CartRouteDto } from "./DTO/cart.dto";
import { CurrentUserDecorator } from "src/user/decorator/current-user.decorator";
import { User } from "src/user/models/user.entity";
import { UserService } from "src/user/services/user.service";

@Controller()
export class CartController{
    constructor(private userService: UserService){}
    @Post()
    @UseGuards(UserGuard)
    addProuctController(@Body() body:CartRouteDto,@CurrentUserDecorator() user:User){

    }
}