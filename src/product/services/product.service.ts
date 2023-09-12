import { Injectable ,BadRequestException,NotFoundException} from "@nestjs/common";
import { CreateCategoryDto } from "src/category/dto/create-category.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../models/product.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import { CreateProductDto } from "../dto/create-product.dto";
import { SubcategoryService } from "src/subcategory/services/subcategory.service";
import { CategoryService } from "src/category/services/category.service";

@Injectable()
export class ProductService {
    constructor
        (
        @InjectModel('Product') private repo:Model<Product>,
        private SubcategoryService:SubcategoryService,
        private CategoryService:CategoryService
        ){}
    async createOne(Body:CreateProductDto){
        const category= await this.CategoryService.findOne(Body.category);
        
        if(!category){return new NotFoundException('Cannot find category')}

        const subcategories=await this.SubcategoryService.
        findAll({ _id : { $in : Body.subcategories },category:Body.category});

        if(subcategories.length != Body.subcategories.length){
            return new BadRequestException('Invalid subcategories');
        }
        
        return this.repo.create(Body);
    };
    async updateOne(id:string,Body:UpdateProductDto){
        if(Body.category){
            const category= await this.CategoryService.findOne(Body.category);
        
            if(!category){return new NotFoundException('Cannot find category')}

            const subcategories=await this.SubcategoryService.
                findAll({ _id : { $in : Body.subcategories },category:Body.category});

            if(subcategories.length != Body.subcategories.length){
            return new BadRequestException('Invalid subcategories');
        }
        }
        return this.repo.findByIdAndUpdate(id, Body,{new:true});
    }
    deleteOne(id:string){
        return this.repo.findByIdAndDelete(id);
    }
    getOne(id:string){
        return this.repo.findById(id);
    }
    getAll(Query:any){
        return this.repo.find(Query);
    }
    filter(Query:any){return this.repo.find(Query);}
}