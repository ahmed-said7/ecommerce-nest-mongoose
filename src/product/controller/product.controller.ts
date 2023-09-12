import { Controller,Get,Delete,Param,UploadedFiles,Body,Query,Patch,NotFoundException,Post,ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { ProductService } from "../services/product.service";
// import {} from "@nestjs/multer";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../models/product.entity";
import { uploadProductImageInterceptor } from "../interceptor/uploadProductImage.interceptor";
import { FileSizeValidationPipe } from "../validator/product.image.validator";



@Controller('/product')

export class ProductController {
    constructor(private ProductService: ProductService){};
    
    @Get()
    async getProds(@Query() query:any){
        const prods=await this.ProductService.filter(query);
        if(prods.length==0){return new NotFoundException('Product not found')};
        return prods
    }
    
    @Get("/:id")
    async getProd(@Param("id") id:string){
        const prod=await this.ProductService.getOne(id);
        if(!prod){return new NotFoundException('Product not found')};
        return prod;
    }


    @Patch("/:id")
    async updateProd(@Param("id") id:string,@Body() body:UpdateProductDto){
        const prod=await this.ProductService.updateOne(id,body);
        if(!prod){return new NotFoundException('Product not found')};
        return prod;
    }


    @Delete("/:id")
    async deleteProd(@Param("id") id:string){
        const prod=await this.ProductService.deleteOne(id);
        if(!prod){return new NotFoundException('Product not found')};
        return prod;
    }


    @Post()
    @UseInterceptors(uploadProductImageInterceptor())
    async createProd(@Body() body:CreateProductDto,
    @UploadedFiles(FileSizeValidationPipe) Obj:{images?:string[],coverImage?:string}){
        console.log(Obj)
        const prod=await this.ProductService.createOne({...body,...Obj});
        if(!prod){return new NotFoundException('Product not found')};
        return prod;
    }

}