import {Injectable } from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserInterface } from "../interface/user-interface.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private repo:Model<UserInterface>){};
    createOne(body:CreateUserDto ){
        return this.repo.create(body);;
    }

    findOne(id:string){
        return this.repo.findOne({_id:id});
    }

    findAll(Query:any){
        return this.repo.find(Query);
    }
    
    filter(Query:any){return this.repo.find(Query);}

    async deleteOne(id:string){
        return this.repo.findByIdAndDelete(id);
    }
    async updateOne(id:string,body:UpdateUserDto){
        return this.repo.findByIdAndUpdate(id,body,{new:true});
    }
}