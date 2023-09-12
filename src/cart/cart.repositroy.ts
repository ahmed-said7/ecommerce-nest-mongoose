import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./cart.entity";
import { CreateCartDto } from "./DTO/create.cart.dto";
import { apiFeatures } from "utils/apiFeatures";
import { UpdateCartDto } from "./DTO/update.cart.dto";


@Injectable()
export class CartRepo {
    constructor(@InjectModel("Cart") private repo:Model<Cart>){};

    createOne(body:CreateCartDto){
        return this.repo.create(body);
    };

    findOne(id:string){
        return this.repo.findById(id);
    };

    async findAll(query:any){
        const features=new apiFeatures(this.repo.find(),query).filter().sort()
        .selectFields().search().pagination();
        return await features.query;
    };

    updateOne(id:string,body:UpdateCartDto){
        return this.repo.findByIdAndUpdate(id,body);
    };

    delteOne(id:string){
        return this.repo.findByIdAndDelete(id);
    }

    findByQuery(query:any){
        return this.repo.find(query);
    }
};