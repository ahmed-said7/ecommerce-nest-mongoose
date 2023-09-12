import {Injectable } from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../models/category.entity";


@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private repo:Model<Category>){};
    createOne(body:CreateCategoryDto ){
        return this.repo.create(body);
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
    async updateOne(id:string,body:UpdateCategoryDto){
        return this.repo.findByIdAndUpdate(id,body,{new:true});
    }
}