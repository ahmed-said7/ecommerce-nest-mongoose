import {Controller,Get,Post,Delete,Patch,UploadedFile,Body,Param,Query, UseInterceptors, BadRequestException} from "@nestjs/common";
import { BrandService } from "./brand.service";
import { CreateBrandDto } from "./DTO/create.brand.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { UpdateBrandDto } from "./DTO/update.brand.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { uploadImageInterceptor } from "./interceptor/brand.image.interceptor";
import { FileSizeValidationPipe } from "./validation/image.validation";



@Controller("/brand")
export class BrandController {
    constructor(private BrandService: BrandService){};
    @Post()
    @UseInterceptors(uploadImageInterceptor())
    createBrand(@Body() body:CreateBrandDto,@UploadedFile(FileSizeValidationPipe) image:string){
        console.log(image);
        body.image=image;
        return this.BrandService.createOne(body);
    }

    @Get("/:id")
    getBrand(@Param("id") id:string){
        return this.BrandService.findOne(id);
    }

    @Get()
    getBrands(@Query() query:any){
        return this.BrandService.findAll(query);
    }

    @Patch("/:id")
    updateBrand(@Param("id") id:string,@Body() body:UpdateBrandDto){
        return this.BrandService.updateOne(id,body);
    }

    @Delete("/:id")
    deleteOne(@Param() id:string){
        return this.BrandService.deleteOne(id);
    }
}