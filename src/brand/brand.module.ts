import { brandSchema } from "./brand.entity";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";

@Module({imports:[MongooseModule.forFeature([{name:"Brand",schema:brandSchema}])]
    ,controllers:[BrandController],providers:[BrandService]
    })
export class BrandModule{}