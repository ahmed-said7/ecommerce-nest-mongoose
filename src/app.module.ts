import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from 'dotenv';
import {join} from "path";
import { CategoryModule } from './category/modules/category.module';
import { SubcategoryModule } from './subcategory/modules/subcategory.module';
import { ProductModule } from './product/modules/product.module';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/modules/user.module';
import { BrandModule } from './brand/brand.module';
import { ServeStaticModule } from '@nestjs/serve-static';
config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,BrandModule
    // ServeStaticModule.forRoot({rootPath:'src/uploads'})
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
