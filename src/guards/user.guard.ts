import {CanActivate,ExecutionContext} from "@nestjs/common";

export class UserGuard implements CanActivate{
    canActivate(context:ExecutionContext){
        const req=context.switchToHttp().getRequest();
        console.log(req.currentUser)
        return req.currentUser;
    }
}