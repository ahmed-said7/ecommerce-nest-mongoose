import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "./DTO/create.brand.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand } from "./brand.entity";
import { apiFeatures } from "utils/apiFeatures";
import { UpdateProductDto } from "src/product/dto/update-product.dto";
import { UpdateBrandDto } from "./DTO/update.brand.dto";

@Injectable()
export class BrandService {
    constructor(@InjectModel('Brand') private Brand:Model<Brand>){};

    createOne( body : CreateBrandDto){
        return this.Brand.create(body);
    };

    findOne(id:string){
        return this.Brand.findById(id);
    };

    async findAll(query:any){
        const features=new apiFeatures(this.Brand.find(),query).filter().sort()
        .selectFields().search().pagination();
        const result=await features.query;
        return result;
    }


    async updateOne(id:string,body:UpdateBrandDto){
        return this.Brand.findByIdAndUpdate(id,body,{new:true});
    };

    async deleteOne(id:string){
        return this.Brand.findByIdAndDelete(id);
    }
}