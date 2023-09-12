import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/modules/category.module';
import { Product, productSchema } from '../models/product.entity';
import { ProductService } from '../services/product.service';
import { ProductController } from '../controller/product.controller';
import { SubcategoryModule } from 'src/subcategory/modules/subcategory.module';

@Module({providers:[ProductService],controllers:[ProductController]
    ,imports:[MongooseModule.forFeature([{name:"Product",schema:productSchema}]),CategoryModule,SubcategoryModule]})

export class ProductModule {}