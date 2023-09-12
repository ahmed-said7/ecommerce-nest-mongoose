import { NestMiddleware,Injectable } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.entity";
import * as jwt from "jsonwebtoken";
import {config} from "dotenv";
import { UserService } from "../services/user.service";
config()

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}


@Injectable()
export class ProtectedMiddleware implements NestMiddleware {
    constructor(private UserService:UserService){}
    async use(req:Request, res:Response, next:NextFunction){
        let token:string;
        req.currentUser=null;
        // console.log(req.headers)

        if(req.headers.authorization  && (req.headers.authorization as string).startsWith('bearer')){
            token = (req.headers.authorization as string).split(" ")[1];
            // console.log(token,"ffff");
        }
        if(token){
            const decoded =jwt.verify(token,process.env.SECRET) as jwt.JwtPayload;
            const user =await this.UserService.findOne(decoded.userId) ;
            if(user){
                if(user.passwordChangedAt){
                    const timestamp=Math.floor( +user.passwordChangedAt / 1000);
                    if(timestamp>decoded.iat){
                        return next();
                    };
                };
                req.currentUser=user;
                console.log(req.currentUser);
            };
        };
        return next();

    }
}