import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import { CreateSubategoryDto } from "../dto/create-subcategory.dto";
import { Subcategory } from "../models/subcategory.entity";
import { UpdateSubategoryDto } from "../dto/update-subcategory.dto";
import { CategoryService } from "src/category/services/category.service";


@Injectable()
export class SubcategoryService {
    constructor(@InjectModel('Subcategory') private repo:Model<Subcategory>,
    private CategoryService:CategoryService){};
    async createOne(body:CreateSubategoryDto ){
        const category=await this.CategoryService.findOne(body.category)
        if(!category){
            return new NotFoundException('Category not found')
        }
        return this.repo.create(body);
    }

    findOne(id:string){
        return this.repo.findOne({_id:id});
    }

    findAll(Query:any){
        return this.repo.find(Query);
    }

    filter(Query:any){return this.repo.find(Query);}

    deleteOne(id:string){
        return this.repo.findByIdAndDelete(id);
    }

    async updateOne(id:string,body:UpdateSubategoryDto){
        if(body.category){
            const category=await this.CategoryService.findOne(body.category)
            if(!category){
                return new NotFoundException('Category not found')
            }
        }
        return this.repo.findByIdAndUpdate(id,body,{new:true});
    }
}