import { Module } from "@nestjs/common";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../services/category.service";
import { Category, categorySchema } from "../models/category.entity";
import { MongooseModule } from "@nestjs/mongoose";

@Module({controllers:[CategoryController],providers:[CategoryService]
    ,imports:
    [MongooseModule.forFeature([{name:"Category",schema:categorySchema}])]
    ,exports:[CategoryService]})

export class CategoryModule {
}