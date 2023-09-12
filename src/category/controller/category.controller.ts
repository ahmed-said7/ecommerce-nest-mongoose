import { Controller,Get,Post,Patch,Delete,Param,NotFoundException,UseGuards,Query,Body, ParseIntPipe } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryService } from "../services/category.service";



@Controller('/category')


export class CategoryController {
    constructor(private CategoryService:CategoryService){}

    @Get()
    async getCats(@Query() query:any){
        const cats=await this.CategoryService.filter(query);
        if(cats.length == 0){return new NotFoundException('cats not found');}
        return cats;
    }


    @Get("/:id")
    getCat(@Param("id") id:string){
        const cat= this.CategoryService.findOne(id);
        if(!cat){return new NotFoundException('cat not found');}
        return cat;
    }


    @Patch("/:id")
    updateCat(@Param("id") id:string,@Body() body:UpdateCategoryDto){
        const cat= this.CategoryService.updateOne(id,body);
        if(!cat){return new NotFoundException('cat not found');}
        return cat;
    }


    @Delete("/:id")
    async deleteCat(@Param("id") id:string){
        const cat=await this.CategoryService.deleteOne(id);
        if(!cat){return new NotFoundException('cat not found');}
        return cat;
    }


    @Post()
    async createCat(@Body() body:CreateCategoryDto){
        const cat= this.CategoryService.createOne(body);
        if(!cat){return new NotFoundException('cat not found');}
        return cat;
    }


}