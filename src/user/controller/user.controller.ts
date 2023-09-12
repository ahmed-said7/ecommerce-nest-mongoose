import { Controller,Get,Post,Patch,Delete,Param,UseGuards,Query,Body, ParseIntPipe,NotFoundException,BadRequestException } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { AuthGuard } from "src/guards/auth.guard";


@Controller('user')
@UseGuards(UseGuards)
@UseGuards(AuthGuard('manager','admin',"user"))

export class UserController {
    constructor(private UserService:UserService){}
    @Get()
    async getUsers(@Query() query:any){
        const users=await this.UserService.filter(query);
        if(users.length){return new NotFoundException('users not found');}
        return users;
    }

    @Get("/:id")
    async getUser(@Param("id") id:string){
        const user= this.UserService.findOne(id);
        if(!user){return new NotFoundException('user not found');}
        return user;
    }

    @Patch("/:id")
    async updateUser(@Param("id") id:string,@Body() body:UpdateUserDto){
        const user=await this.UserService.updateOne(id,body);
        if(!user){return new NotFoundException('user not found');}
        return user;
    }

    @Delete("/:id")
    async deleteUser(@Param("id") id:string){
        const user=await this.UserService.deleteOne(id);
        if(!user){return new NotFoundException('user not found');}
        return user;
    }

    @Post()
    async createUser(@Body() body:CreateUserDto){
        const user=await this.UserService.createOne(body);
        if(!user){return new NotFoundException('user not found');}
        return user;
    }
}