import {Module} from '@nestjs/common';
import { SubcategoryController } from '../controller/subcategory.controller';
import { SubcategoryService } from '../services/subcategory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, subcategorySchema } from '../models/subcategory.entity';
import { CategoryModule } from 'src/category/modules/category.module';

@Module({providers:[SubcategoryService],controllers:[SubcategoryController]
    ,imports:[
        MongooseModule.forFeature([{name:"Subcategory",schema:subcategorySchema}])
        ,CategoryModule],
    exports:[SubcategoryService]
})

export class SubcategoryModule {}