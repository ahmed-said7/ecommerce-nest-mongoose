import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export const CurrentUserDecorator=createParamDecorator(
    (data:never,context:ExecutionContext)=>{
        const req=context.switchToHttp().getRequest();
        return req.currentUser;
    }
)