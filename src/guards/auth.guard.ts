import {CanActivate,ExecutionContext} from "@nestjs/common";



export const AuthGuard = ( ...roles: string [] ) => class implements CanActivate {
        canActivate(context:ExecutionContext){
            const req=context.switchToHttp().getRequest();
            const role = req.currentUser.role;
            return roles.includes(role);
        }
    }