import { ExecutionContext , NestInterceptor , CallHandler, Injectable } from "@nestjs/common";
import { map} from "rxjs";
import {plainToClass} from "class-transformer";


@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    constructor(private repo:any){}
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(map((data:any)=>{
            if(data.token){
                const user=plainToClass(this.repo,data.user,{excludeExtraneousValues:true});
                return {user,token:data.token,status:"success"}
            }else{
                return plainToClass(this.repo,data,{excludeExtraneousValues:true});
            }
        }))
    }
}