import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';
import { Module ,MiddlewareConsumer} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { userSchema } from '../models/user.entity';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';
import { ProtectedMiddleware } from '../middleware/auth-user.middleware';
import { PasswordController } from '../controller/password.controller';
import { LoggedUserController } from '../controller/logged-user.controller';
import { PasswordService } from '../services/password.services';
import {MailerModule} from "@nestjs-modules/mailer";
import { config } from "dotenv";
config()

@Module(
    {
    providers:[UserService,AuthService,PasswordService]
    ,controllers:[AuthController,UserController,PasswordController,LoggedUserController],
    imports:[MongooseModule.forFeature([{name:"User",schema:userSchema}]),
    MailerModule.forRoot(
        {
            transport:
            {
                host:process.env.HOST,port:+process.env.PORT,
                secure: process.env.SECURE == "true" ? true : false ,
                auth: {user:process.env.USER,pass:process.env.PASS} 
            }
        }
    )]})

export class UserModule {
    // configure(consumer:MiddlewareConsumer){
    //     consumer.apply(ProtectedMiddleware).forRoutes("*");
    // }
}